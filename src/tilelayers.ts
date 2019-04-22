import L, {TileLayerOptions} from "leaflet";

const blankLayer = L.tileLayer("");
const OpenStreetMapMapnik = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
} as CustomTileLayerOptions);
const ThunderforestOpenCycleMap = L.tileLayer("https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: process.env.API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);
const ThunderforestOutdoors = L.tileLayer("https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: process.env.API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);
const BasemapATbasemap = L.tileLayer("https://maps{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.{format}", {
    maxZoom: 20,
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
    subdomains: ["", "1", "2", "3", "4"],
    format: "png",
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
} as CustomTileLayerOptions);
const ThunderforestTransport = L.tileLayer("https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: process.env.API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);

const StamenTonerLite = L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}", {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: "abcd",
    minZoom: 0,
    maxZoom: 20,
    ext: "png"
} as CustomTileLayerOptions);

export const mapLayers = {
    "Leer": blankLayer,
    "Basemap.at": BasemapATbasemap,
    "Standard-OSM": OpenStreetMapMapnik,
    "Wanderkarte": ThunderforestOutdoors,
    "Fahrradkarte": ThunderforestOpenCycleMap,
    "Öffi": ThunderforestTransport,
    "Schwarz-Weiß": StamenTonerLite
};

declare var process: {
    env: {
        API_KEY: string
    }
};

declare interface CustomTileLayerOptions extends TileLayerOptions {
    apikey?: string,
    ext?: string

}