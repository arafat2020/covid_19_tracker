import React from 'react';
import './Map.css'
import 'leaflet/dist/leaflet.css'
import {  Map as Maper,TileLayer,  } from 'react-leaflet'
import { showDataonMAp } from './util'

const Map = ({ center,caseType, zoom, mapCountry }) => {

    return (
        <div className="map">
           <Maper center={center} zoom={zoom} >
           <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                 {showDataonMAp(mapCountry,caseType)}
           </Maper>
        </div>
    );
};

export default Map;