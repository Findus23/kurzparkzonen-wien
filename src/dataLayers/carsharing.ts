import L, {LatLng} from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";
import {GeoJsonObject} from "geojson";
import {Feature} from "../interfaces";

export const carsharingLayer = new L.GeoJSON(<unknown>[] as GeoJsonObject, {
    pointToLayer: function(feature:Feature, latlng:LatLng) {
        return L.circleMarker(latlng, {
            radius: 2,
            fillColor: "#999022",
            color: "#999022"
        }).bindPopup(getPopupText(feature, "Carsharing"));
    }
});
carsharingLayer.getAttribution = attribution;
