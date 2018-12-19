import * as L from "leaflet";
import {dataLayers} from "./dataLayers/dataLayers";
import {mapLayers} from "./tilelayers";

function loadLayerData(layers, map) {
    const spinner = document.getElementById("spinnerWrapper");
    spinner.classList.add("shown");
    layers.forEach((obj) => {
        if (!obj.overlay || !map.hasLayer(obj.layer)) {
            return false
        }
        const layer = dataLayers[obj.name];
        layer.clearLayers();
        switch (obj.name) {
            case "Parkstreifen":
                import (/* webpackChunkName: "parkstreifen" */"../processed/Kurzparkstreifen").then(parkstreifen => {
                    layer.addData(parkstreifen);
                });
                break;
            case "Parkzonen":
                import (/* webpackChunkName: "parkzonen" */"../processed/Kurzparkzonen").then(parkzonen => {
                    layer.addData(parkzonen);
                });
                break;
            case "AnrainerInnenparkplätze":
                import (/* webpackChunkName: "anrainer" */"../processed/AnrainerInnenparkplätze").then(anrainer => {
                    layer.addData(anrainer);
                });
                break;
            case "Behindertenparkplätze":
                import (/* webpackChunkName: "bp" */"../processed/Behindertenparkplätze").then(bp => {
                    layer.addData(bp);
                });
                break;
            case "Geltungsbereiche":
                import (/* webpackChunkName: "geltungsbereiche" */"../processed/Geltungsbereiche").then(geltungsbereich => {
                    layer.addData(geltungsbereich);
                });
                break;
            case "Berechtigungszone":
                import (/* webpackChunkName: "berechtigungsZone" */"../processed/Berechtigungszone").then(berechtigungsZone => {
                    layer.addData(berechtigungsZone);
                });
                break;
        }
    });
}

L.Control.Layers.include({
    saveLayers: function() {
        // create hash to hold all layers
        const overlayLayers = [];
        let enabledMapLayer;

        // loop through all layers in control
        this._layers.forEach((obj) => {
            // check if layer is an overlay
            if (this._map.hasLayer(obj.layer)) {
                if (obj.overlay) {
                    overlayLayers.push(obj.name);
                } else {
                    enabledMapLayer = obj.name;
                }
            }
        });
        loadLayerData(this._layers, this._map);

        localStorage.setItem("layers", JSON.stringify({
            overlayLayers: overlayLayers,
            enabledMapLayer: enabledMapLayer
        }));
    },
    restoreLayers: function() {
        const map = this._map;
        const fromStorage = localStorage.getItem("layers");
        let overlayLayers;
        if (fromStorage) {
            const parsedStorage = JSON.parse(localStorage.getItem("layers"));
            overlayLayers = parsedStorage.overlayLayers;
            const enabledMapLayer = parsedStorage.enabledMapLayer;
            mapLayers[enabledMapLayer].addTo(map);

        } else {
            if (process.env.NODE_ENV === "production") {
                mapLayers["Basemap.at"].addTo(map);
            } else {
                mapLayers.Leer.addTo(map);
            }
            overlayLayers = ["Parkstreifen", "Parkzonen"]
        }
        overlayLayers.forEach(function(name) {
            dataLayers[name].addTo(map);
        });
        loadLayerData(this._layers, this._map);
        return true;

    }

});
