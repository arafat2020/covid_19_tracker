import React, { useState,useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral'

const option = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio:false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function(tooltipItem, data){
                return numeral(tooltipItem.value).format("+0,0")
            }
        }
    },
    scales: {
        xAxes:[{
            type:"time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll"
            }
        }],
        yAxes:[{
            gridLines: {
                display: {
                    display: false
                },
                ticks: {
                    callback: function (value, index, values){
                        return numeral(value).format("0a")
                    }
                }
            }
        }]
    }
}

const Linegraph = ({caseType='cases',...props}) => {
    const [data, setData] = useState({});

    // https://disease.sh/v3/covid-19/historical/all?lastdays=120
    const buildChartData = (data, caseType,) => {
        const chartData = [];
        let lastdataPoint;
        for (let date in data.cases){
            if(lastdataPoint){
                const newdatapoint = {
                    x:date,
                    y:data[caseType][date] - lastdataPoint
                }
                chartData.push(newdatapoint)
            }
            lastdataPoint = data[caseType][date]
        }
        return chartData;
    }

    useEffect(() => {
        const fetchdata = async () =>{
        await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then((data)=>{
            console.log(data)
            const chartdata = buildChartData(data,caseType)
            setData(chartdata)
        })
        }
        fetchdata()
    },[caseType])
  

    return (
        <div className={props.className} >
            {data?.length > 0 && (
                <Line
                options={option}
                data={{
                    datasets: [
                        {   
                            backgroundColor: "rgba(204, 16, 52, 0.6)",
                            borderColor:"#CC1034",
                            data: data,
                        }
                    ]
                }}
                />
            )}
            
        </div>
    );
};

export default Linegraph;