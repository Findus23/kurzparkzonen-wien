import L from "leaflet";
import apiKey from "./apikey";

const blankLayer = L.tileLayer('');

const OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
const Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: apiKey,
    maxZoom: 22
});
const Thunderforest_Outdoors = L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: apiKey,
    maxZoom: 22
});
const BasemapAT_basemap = L.tileLayer('https://maps{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.{format}', {
    maxZoom: 20,
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
    subdomains: ["", "1", "2", "3", "4"],
    format: 'png',
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
});
const Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: apiKey,
    maxZoom: 22
});

const Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});

export const mapLayers = {
    "Leer": blankLayer,
    "Basemap.at": BasemapAT_basemap,
    'Standard-OSM': OpenStreetMap_Mapnik,
    "Wanderkarte": Thunderforest_Outdoors,
    "Fahrradkarte": Thunderforest_OpenCycleMap,
    "Öffi": Thunderforest_Transport,
    "Schwarz-Weiß": Stamen_TonerLite,
};
