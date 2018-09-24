import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {dataLayers} from "./dataLayers/dataLayers";
import "./style.scss";
import {mapLayers} from "./tilelayers";
import {initAnalytics} from "./analytics";
import "./customControl";

require("leaflet.locatecontrol");

if (process.env.NODE_ENV === "production") {
    initAnalytics();
}

document.addEventListener("DOMContentLoaded", function() {
    const map = L.map("map").setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;

    const control = L.control.layers(mapLayers, dataLayers).addTo(map);


    if (!control.restoreLayers()) {

    }
    map.createPane("zonenPane");
    map.getPane("zonenPane").style.zIndex = "300";

    map.on("overlayadd overlayremove baselayerchange", function() {
        console.info(control.saveLayers());
    });

    L.control.locate().addTo(map);
}, false);
