import {CircleMarker, GeoJSON, LatLng} from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";
import {GeoJsonObject} from "geojson";
import {Feature} from "../interfaces";

export const verkaufsstellenLayer = new GeoJSON(<unknown>[] as GeoJsonObject, {
    pointToLayer: function (feature: Feature, latlng: LatLng) {
        return new CircleMarker(latlng, {
            radius: 2,
            fillColor: "#9a311b",
            color: "#9a311b"
        }).bindPopup(getPopupText(feature, "Verkaufsstelle"));
    }
});
verkaufsstellenLayer.getAttribution = attribution;
