import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {dataLayers} from "./dataLayers/dataLayers";
import "./style.scss";
import {mapLayers, optionalMapLayers, OwnLayer} from "./tilelayers";
import {initAnalytics} from "./analytics";
import "./customControl";
import {CustomControl} from "./customControl";
import {searchPopupHtml} from "./searchPopup";
//@ts-ignore
import {GeocodingResult, NominatimResult} from "leaflet-control-geocoder/dist/geocoders";

const searchPopupTemplate = require("./searchPopup.ejs");
const searchDisplayTemplate = require("./searchDisplay.ejs");


require("leaflet.locatecontrol");

if (process.env.NODE_ENV === "production") {
    initAnalytics();
}

document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;
    const optionalLayers = Object.assign(dataLayers, optionalMapLayers);
    const control = L.control.layers(mapLayers, optionalLayers).addTo(map) as CustomControl;


    if (!control.restoreLayers()) {

    }
    map.addLayer(OwnLayer)
    map.createPane("zonenPane");
    const zonenPane = map.getPane("zonenPane");
    if (zonenPane) {
        zonenPane.style.zIndex = "300";
    }
    map.on("overlayadd overlayremove baselayerchange", function () {
        control.saveLayers();
    });

    L.control.locate().addTo(map);
    const viennabbox = ["48.1179069", "48.3226679", "16.181831", "16.5775132"]
    //@ts-ignore
    const geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            bounded: 1,
            viewbox: `${viennabbox[3]},${viennabbox[1]},${viennabbox[2]},${viennabbox[0]}`
        },
        htmlTemplate: function (r: NominatimResult) {
            return searchPopupHtml(r, searchDisplayTemplate, undefined)
        }
    })
    //@ts-ignore
    const a = L.Control.geocoder({
        defaultMarkGeocode: false,
        showResultIcons: true,
        geocoder: geocoder
    });
    a.on('markgeocode', function (e: any) {
        const result = e.geocode as GeocodingResult
        const html = searchPopupHtml(result.properties, searchPopupTemplate, result.icon)
        const marker = new L.CircleMarker(result.center)
          .bindPopup(html)
          .addTo(map)
          .openPopup();

        map.fitBounds(result.bbox);
    })
    a.addTo(map)
}, false);

declare global {
    interface Window {
        map: L.Map;
    }
}
