import {CircleMarker, GeoJSON, LatLng} from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";
import {GeoJsonObject} from "geojson";
import {Feature} from "../interfaces";

export const garagenLayer = new GeoJSON(<unknown>[] as GeoJsonObject, {
    pointToLayer: function (feature: Feature, latlng: LatLng) {
        return new CircleMarker(latlng, {
            radius: 2,
            fillColor: "#22995c",
            color: "#22995c"
        }).bindPopup(getPopupText(feature, "Garagen"));
    }
});
garagenLayer.getAttribution = attribution;
