import L from "leaflet";
import {feature} from "topojson-client";

export const TopoJsonLayer = L.GeoJSON.extend({
    // @ts-ignore
    addData: function (jsonData: TopoJSON) {
        if (jsonData.type === "Topology") {
            for (const key in jsonData.objects) {
                if (Object.prototype.hasOwnProperty.call(jsonData.objects, key)) {
                    const geojson = feature(jsonData, jsonData.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }
        } else {
            L.GeoJSON.prototype.addData.call(this, jsonData);
        }
        return this;
    }
});
