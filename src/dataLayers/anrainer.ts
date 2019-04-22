import L, {PathOptions} from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#23c796",
    weight: 3,
    opacity: 1
};

const activeStyle: PathOptions = {
    color: "#1b9e77",
    weight: 8
};

export const anrainerLayer = new L.GeoJSON(<unknown>[] as GeoJsonObject, {
    style: normalStyle,
    onEachFeature: function (feature: Feature, layer: L.GeoJSON) {
        layer.on({
            popupopen: function () {
                layer.setStyle(activeStyle);
            },
            popupclose: function () {
                layer.setStyle(normalStyle);
            }
        });
        layer.bindPopup(getPopupText(feature, "AnrainerInnenparkplatz"));
    }
});
anrainerLayer.getAttribution = attribution;
