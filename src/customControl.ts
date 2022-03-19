import * as L from "leaflet";
import {dataLayers} from "./dataLayers/dataLayers";
import {mapLayers} from "./tilelayers";

function loadLayerData(layers: [SomeLayerObject], map: L.Map) {

    layers.forEach((obj: SomeLayerObject) => {
        if (!obj.overlay || !map.hasLayer(obj.layer)) {
            return false
        }
        if (obj.layer instanceof L.TileLayer) {
            // no data needs to be loaded as it is a TileLayer
            return true
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
            case "Carsharing":
                // @ts-ignore
                import (/* webpackChunkName: "Carsharing" */"../processed/Carsharing").then(carsharing => {
                    layer.addData(carsharing);
                });
                break;
            case "Fußgängerzonen":
                // @ts-ignore
                import (/* webpackChunkName: "fusgangerzonen" */"../processed/Fußgängerzonen").then(fusgangerzonen => {
                    layer.addData(fusgangerzonen);
                });
                break;
            case "Garagen":
                // @ts-ignore
                import (/* webpackChunkName: "garagen" */"../processed/Garagen").then(garagen => {
                    layer.addData(garagen);
                });
                break;
            case "Tempo 30 Zone":
                // @ts-ignore
                import (/* webpackChunkName: "tempo30" */"../processed/Tempo30").then(tempo30 => {
                    layer.addData(tempo30);
                });
                break;
            case "Verkaufsstellen":
                // @ts-ignore
                import (/* webpackChunkName: "verkaufsstellen" */"../processed/Verkaufsstellen").then(verkaufsstellen => {
                    layer.addData(verkaufsstellen);
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
        this._layers.forEach((obj: any) => {
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
        let overlayLayers;
        try {
            // @ts-ignore
            const parsedStorage = JSON.parse(localStorage.getItem("layers"));
            overlayLayers = parsedStorage.overlayLayers;
            const enabledMapLayer = parsedStorage.enabledMapLayer;
            // @ts-ignore
            mapLayers[enabledMapLayer].addTo(map);
            overlayLayers.forEach(function (name: string) {
                dataLayers[name].addTo(map);
            });
        } catch (error) {
            if (import.meta.env.PROD) {
                mapLayers["Basemap.at"].addTo(map);
            } else {
                mapLayers.Leer.addTo(map);
            }
            ["Parkstreifen", "Parkzonen"].forEach(function (name) {
                dataLayers[name].addTo(map);
            });

        }
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
