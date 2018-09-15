import L from "leaflet";
import * as topojson from "topojson-client";

export const topoJsonLayer = L.GeoJSON.extend({
    addData: function(jsonData) {
        if (jsonData.type === 'Topology') {
            for (let key in jsonData.objects) {
                let geojson = topojson.feature(jsonData, jsonData.objects[key]);
                L.GeoJSON.prototype.addData.call(this, geojson);
            }
        }
        else {
            L.GeoJSON.prototype.addData.call(this, jsonData);
        }
        return this;
    }
});
