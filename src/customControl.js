import * as L from "leaflet";
import {dataLayers} from "./dataLayers/dataLayers";
import {mapLayers} from "./tilelayers";

L.Control.Layers.include({
    saveLayers: function() {
        // create hash to hold all layers
        const overlayLayers = [];
        let enabledMapLayer;

        // loop through all layers in control
        this._layers.forEach((obj) => {
            // check if layer is an overlay
            console.warn(obj);
            if (this._map.hasLayer(obj.layer)) {
                if (obj.overlay) {
                    overlayLayers.push(obj.name);
                } else {
                    enabledMapLayer = obj.name;
                }
            }
        });

        localStorage.setItem("layers", JSON.stringify({
            overlayLayers: overlayLayers,
            enabledMapLayer: enabledMapLayer
        }));
    },
    restoreLayers: function() {
        const map = this._map;
        const fromStorage = localStorage.getItem("layers");
        if (fromStorage) {
            const parsedStorage = JSON.parse(localStorage.getItem("layers"));
            const overlayLayers = parsedStorage.overlayLayers;
            const enabledMapLayer = parsedStorage.enabledMapLayer;

            overlayLayers.forEach(function(name) {
                dataLayers[name].addTo(map);
            });
            mapLayers[enabledMapLayer].addTo(map);
            return true;
        }
        return false;

    }

});
