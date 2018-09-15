import L from "leaflet";
import * as topojson from "topojson-client";

export const TopoJsonLayer = L.GeoJSON.extend({
    addData: function(jsonData) {
        if (jsonData.type === "Topology") {
            for (const key in jsonData.objects) {
                if (Object.prototype.hasOwnProperty.call(jsonData.objects, key)) {
                    const geojson = topojson.feature(jsonData, jsonData.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }
        }
        else {
            L.GeoJSON.prototype.addData.call(this, jsonData);
        }
        return this;
    }
});
