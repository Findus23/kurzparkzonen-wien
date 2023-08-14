import L, {Browser, TileLayerOptions} from "leaflet";
import retina = Browser.retina;

const blankLayer = L.tileLayer("");
const OpenStreetMapMapnik = L.tileLayer("https://maps.lw1.at/tiles/1.0.0/osm/GLOBAL_MERCATOR/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
} as CustomTileLayerOptions);
const ThunderforestOpenCycleMap = L.tileLayer("https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: import.meta.env.VITE_API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);
const ThunderforestOutdoors = L.tileLayer("https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: import.meta.env.VITE_API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);
const basemap_lq_url = "https://maps.lw1.at/tiles/1.0.0/basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.{format}"
const basemap_hq_url = "https://maps.lw1.at/tiles/1.0.0/basemap_hq/webmercator_hq/{z}/{x}/{y}.{format}"

const basemap_url = retina ? basemap_hq_url : basemap_lq_url

const BasemapATbasemap = L.tileLayer(basemap_url, {
    maxZoom: 19,
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
    format: "png",
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
} as CustomTileLayerOptions);
const ThunderforestTransport = L.tileLayer("https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}", {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: import.meta.env.VITE_API_KEY,
    maxZoom: 22
} as CustomTileLayerOptions);

// https://{s}.piano.tiles.quaidorsay.fr/fr/{z}/{x}/{y}.png
const Piano = L.tileLayer('https://maps.lw1.at/tiles/1.0.0/piano/GLOBAL_MERCATOR/{z}/{x}/{y}.png', {
    attribution: 'Tiles <a href="https://github.com/tilery/pianoforte">PianoFr</a> | &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 20,
});

//https://{s}.forte.tiles.quaidorsay.fr/fr/{z}/{x}/{y}.png
const Forte = L.tileLayer('https://maps.lw1.at/tiles/1.0.0/forte/GLOBAL_MERCATOR/{z}/{x}/{y}.png', {
    attribution: 'Tiles <a href="https://github.com/tilery/pianoforte">PianoFr</a> | &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 20,
});

// https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png
const CyclOSM = L.tileLayer('https://maps.lw1.at/tiles/1.0.0/cyclOSM/GLOBAL_MERCATOR/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm-lite/{z}/{x}/{y}.png
const CyclOSMLite = L.tileLayer('https://maps.lw1.at/tiles/1.0.0/cyclOSM-lite/GLOBAL_MERCATOR/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png
const OpenRailwayMap = L.tileLayer('https://maps.lw1.at/tiles/1.0.0/openrailway/GLOBAL_MERCATOR/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const BasemapATorthofoto = L.tileLayer("https://maps.lw1.at/tiles/1.0.0/basemap_orthofoto/GLOBAL_MERCATOR/{z}/{x}/{y}.jpeg", {
    maxZoom: 19,
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
    format: "jpeg",
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
} as CustomTileLayerOptions);


export const mapLayers = {
    "Leer": blankLayer,
    "Basemap.at": BasemapATbasemap,
    "Standard-OSM": OpenStreetMapMapnik,
    "Wanderkarte": ThunderforestOutdoors,
    "Fahrradkarte": CyclOSM,
    "Öffi": ThunderforestTransport,
    "Hell": Forte,
    "Einfach": Piano,
    "Orthofoto": BasemapATorthofoto,
    // "dfdssdfsdfdsf": Piano
};

export const optionalMapLayers = {
    "Öffi-Overlay": OpenRailwayMap,
    "Radfahrer-Overlay": CyclOSMLite
}

declare var process: {
    env: {
        API_KEY: string
    }
};

declare interface CustomTileLayerOptions extends TileLayerOptions {
    apikey?: string,
    ext?: string

}
