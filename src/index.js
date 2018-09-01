import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";

import apiKey from "./apikey"; //optional


document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([48.51579416571888, 15.6255304813385], 13);
    let layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let Thunderforest_OpenCycleMap = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: apiKey,
        maxZoom: 22
    });
    let Thunderforest_Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: apiKey,
        maxZoom: 22
    });
    let blankLayer = L.tileLayer('');
    let LeafIcon = L.Icon.extend({
        options: {
            iconAnchor: [16, 35],
            popupAnchor: [0, -35]
        }
    });

    let categories = {},
        category;

    let mapLayers = {
        "Leer": blankLayer,
        'Standard': layer,
        "Wanderkarte": Thunderforest_Outdoors,
        "Fahrradkarte": Thunderforest_OpenCycleMap
    };

    let attribution = function() {
        return 'Icons von <a href="https://mapicons.mapsmarker.com">mapicons.mapsmarker.com</a> ' +
            '(<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY SA 3.0</a>)' + " | " +
            '<a href="main.licenses.txt" target="_blank">Lizenzen</a> + ' +
            '<a href="https://github.com/Findus23/POI-Schiltern" target="_blank">Source</a>' +
            ' | <a href="https://www.ferienhaus-schiltern.at/impressum/" target="_blank">Impressum und Datenschutz</a>';
    };
    let overlays = {};
    let categoryName, categoryArray, categoryLG;

    // geojsonLayer.addData(poi);
    map.fitBounds(geojsonLayer.getBounds());
    let control = L.control.layers(mapLayers).addTo(map);

    // L.control.locate().addTo(map);
}, false);
