import React, { useEffect, useState } from 'react';
import {MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import { sortdata,prityer } from './util';
import Linegraph from './Linegraph';
// import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [countryeName, setCountryNmae] = useState("worldwide");
  const [countruInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([24, 90]);
  // const [mapZoom, setMapZoom] = useState(3);
  const [mapCountry, setMapCountry] = useState([]);
  const [caseType, setCaseType] = useState("cases")

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data => {
      setCountryInfo(data)
    })
  },[])

  useEffect(()=>{
    const getCountData = async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sorteddata = sortdata(data)
        setCountries(countries);
        setTableData(sorteddata);
        setMapCountry(data)
      })
    }
    getCountData()
  },[]);
  const onCountChang = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then(response => response.json()).then(data => {
      setCountryNmae(countryCode);
      setCountryInfo(data);
      // if(countryeName === "worldwide"){
      //   setMapCenter([24, 90])
      // }
      setMapCenter( countryCode==="worldwide" ? [24, 90] : [data.countryInfo.lat,data.countryInfo.long]);
      
      // setMapZoom(4)
    })
  }
  
  console.log(mapCountry)

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl   className="app__dropdown">
        <Select variant="outlined" onChange={onCountChang} value={countryeName} >
          <MenuItem  value="worldwide">Worldwide</MenuItem>
          {countries.map((country)=>{
            return <MenuItem value={country.value} >{country.name}</MenuItem>
          })}
        </Select>
      </FormControl>
      </div>
      <div className="app__status">
        <Infobox 
        isRed
        active={caseType === "cases"}
        onClick={(e) => setCaseType("cases")}
        title=" Cases" 
        cases={prityer(countruInfo.todayCases)} 
        total={prityer(countruInfo.cases)} />
        <Infobox 
        active={caseType === "recovered"}
        onClick={(e) => setCaseType("recovered")}
        title="Recoverd" 
        cases={prityer(countruInfo.todayRecovered)} 
        total={prityer(countruInfo.recovered)} />
        <Infobox 
        isRed
        active={caseType === "deaths"}
        onClick={(e) => setCaseType("deaths")}
        title="Deaths" 
        cases={prityer(countruInfo.todayDeaths)} 
        total={prityer(countruInfo.deaths)} />
      </div>
      <Map
         center={mapCenter}
         zoom="3"
         mapCountry={mapCountry}
         caseType={caseType}
      />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="graph_title" >Worldwide new {caseType}</h3>
          <Linegraph className="app_garph" caseType={caseType} />
        </CardContent>
      </Card>
    </div>

  );
}

export default App;
