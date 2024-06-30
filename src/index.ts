import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";

import {dataLayers} from "./dataLayers/dataLayers";
import "./style.scss";
import {mapLayers, optionalMapLayers} from "./tilelayers";
import {initAnalytics, isOlderAndroid, isWebview} from "./analytics";
import "./customControl";
import {CustomControl} from "./customControl";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import {GeocodingResult, NominatimResult} from "leaflet-control-geocoder/dist/geocoders";
import {ExtendedMap} from "./interfaces";
import "leaflet.locatecontrol";

import {searchPopupHtml} from "./searchPopup";


if (import.meta.env.PROD) {
    initAnalytics();
}

function mapInit() {
    const map: ExtendedMap = L.map("map").setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;
    const optionalLayers = Object.assign(dataLayers, optionalMapLayers);
    const control = L.control.layers(mapLayers, optionalLayers).addTo(map) as CustomControl;


    if (!control.restoreLayers()) {

    }
    map.createPane("zonenPane");
    const zonenPane = map.getPane("zonenPane");
    if (zonenPane) {
        zonenPane.style.zIndex = "300";
    }
    map.on("overlayadd overlayremove baselayerchange", function () {
        control.saveLayers();
    });

    L.control.locate({
        locateOptions: {
            enableHighAccuracy: true
        }
    }).addTo(map);
    const viennabbox = ["48.1179069", "48.3226679", "16.181831", "16.5775132"]
    //@ts-ignore
    const geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
            bounded: 1,
            viewbox: `${viennabbox[3]},${viennabbox[1]},${viennabbox[2]},${viennabbox[0]}`
        },
        htmlTemplate: function (r: NominatimResult) {
            return searchPopupHtml(r, "searchDisplayTemplate", undefined)
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
        const html = searchPopupHtml(result.properties, "searchPopupTemplate", result.icon)
        const marker = new L.CircleMarker(result.center, {radius: 10})
            .bindPopup(html)
            .addTo(map)
            .openPopup();

        map.fitBounds(result.bbox);
    })
    a.addTo(map)
}

if (isWebview && isOlderAndroid) {
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(mapInit, 50)
    }, false);
} else {
    document.addEventListener("DOMContentLoaded", mapInit, false);
}

function closePopup() {
    const popupWasOpen = !!window.map._popup
    window.map.closePopup()
    return popupWasOpen
}

window.closePopup = closePopup

declare global {
    interface Window {
        map: ExtendedMap;
        closePopup: () => boolean;
    }
}
