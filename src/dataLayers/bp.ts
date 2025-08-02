import {CircleMarker, GeoJSON, LatLng} from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";
import {GeoJsonObject} from "geojson";
import {Feature} from "../interfaces";

export const bpLayer = new GeoJSON(<unknown>[] as GeoJsonObject, {
    pointToLayer: function(feature:Feature, latlng:LatLng) {
        return new CircleMarker(latlng, {
            radius: 2,
            fillColor: "#a6761d",
            color: "#a6761d"
        }).bindPopup(getPopupText(feature, "Behindertenparkplätze"));
    }
});
bpLayer.getAttribution = attribution;
