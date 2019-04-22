import * as L from "leaflet";
import {dataLayers} from "./dataLayers/dataLayers";
import {mapLayers} from "./tilelayers";

function loadLayerData(layers: [SomeLayerObject], map: L.Map) {

    layers.forEach((obj: SomeLayerObject) => {
        if (!obj.overlay || !map.hasLayer(obj.layer)) {
            return false
        }
        const layer = dataLayers[obj.name];
        layer.clearLayers();
        switch (obj.name) {
            case "Parkstreifen":
                // @ts-ignore
                import (/* webpackChunkName: "parkstreifen" */"../processed/Kurzparkstreifen").then(parkstreifen => {
                    layer.addData(parkstreifen);
                });
                break;
            case "Parkzonen":
                // @ts-ignore
                import (/* webpackChunkName: "parkzonen" */"../processed/Kurzparkzonen").then(parkzonen => {
                    layer.addData(parkzonen);
                });
                break;
            case "AnrainerInnenparkplätze":
                // @ts-ignore
                import (/* webpackChunkName: "anrainer" */"../processed/AnrainerInnenparkplätze").then(anrainer => {
                    layer.addData(anrainer);
                });
                break;
            case "Behindertenparkplätze":
                // @ts-ignore
                import (/* webpackChunkName: "bp" */"../processed/Behindertenparkplätze").then(bp => {
                    layer.addData(bp);
                });
                break;
            case "Geltungsbereiche":
                // @ts-ignore
                import (/* webpackChunkName: "geltungsbereiche" */"../processed/Geltungsbereiche").then(geltungsbereich => {
                    layer.addData(geltungsbereich);
                });
                break;
            case "Berechtigungszone":
                // @ts-ignore
                import (/* webpackChunkName: "berechtigungsZone" */"../processed/Berechtigungszone").then(berechtigungsZone => {
                    layer.addData(berechtigungsZone);
                });
                break;
        }
    });
}

L.Control.Layers.include({
    saveLayers: function () {
        // create hash to hold all layers
        const overlayLayers: L.GeoJSON[] = [];
        let enabledMapLayer;

        // loop through all layers in control
        // @ts-ignore
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
        console.info(overlayLayers);
        loadLayerData(this._layers, this._map);

        localStorage.setItem("layers", JSON.stringify({
            overlayLayers: overlayLayers,
            enabledMapLayer: enabledMapLayer
        }));
    },
    restoreLayers: function () {
        const map = this._map;
        const fromStorage = localStorage.getItem("layers");
        let overlayLayers;
        if (fromStorage) {
            // @ts-ignore
            const parsedStorage = JSON.parse(localStorage.getItem("layers"));
            overlayLayers = parsedStorage.overlayLayers;
            const enabledMapLayer = parsedStorage.enabledMapLayer;
            // @ts-ignore
            mapLayers[enabledMapLayer].addTo(map);

        } else {
            if (process.env.NODE_ENV === "production") {
                mapLayers["Basemap.at"].addTo(map);
            } else {
                mapLayers.Leer.addTo(map);
            }
            overlayLayers = ["Parkstreifen", "Parkzonen"]
        }
        overlayLayers.forEach(function (name: string) {
            dataLayers[name].addTo(map);
        });
        loadLayerData(this._layers, this._map);
        return true;

    }

});

export interface CustomControl extends L.Control.Layers {
    saveLayers(): void,

    restoreLayers(): [L.GeoJSON]
}

export interface SomeLayerObject {
    name: string,
    layer: L.Layer,
    overlay: undefined

}