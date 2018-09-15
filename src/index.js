import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import {mapLayers} from "./tilelayers";
import {dataLayers} from "./dataLayers/dataLayers";

require('leaflet.locatecontrol');


document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;

    if (process.env.NODE_ENV === 'production') {
        mapLayers["Basemap.at"].addTo(map);
    } else {
        mapLayers.Leer.addTo(map);
    }


    map.createPane('zonenPane');
    map.getPane('zonenPane').style.zIndex = "300";

    dataLayers.Parkstreifen.addTo(map);
    dataLayers.Parkzonen.addTo(map);
    dataLayers.AnrainerInnenparkplätze.addTo(map);
    
    let control = L.control.layers(mapLayers, dataLayers).addTo(map);
    map.on('overlayadd overlayremove', function(e) {
        console.info(e);
    });

    L.control.locate().addTo(map);
}, false);
