import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {dataLayers} from "./dataLayers/dataLayers";
import "./style.scss";
import {mapLayers, optionalMapLayers} from "./tilelayers";
import {initAnalytics} from "./analytics";
import "./customControl";
import {CustomControl} from "./customControl";

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
    map.createPane("zonenPane");
    const zonenPane = map.getPane("zonenPane");
    if (zonenPane) {
        zonenPane.style.zIndex = "300";
    }
    map.on("overlayadd overlayremove baselayerchange", function () {
        console.info(control.saveLayers());
    });

    L.control.locate().addTo(map);
}, false);

declare global {
    interface Window {
        map: L.Map;
    }
}
