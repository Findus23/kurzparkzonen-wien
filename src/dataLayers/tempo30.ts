import L, {PathOptions} from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#7570b3",
    weight: 3,
    opacity: 1
};

const activeStyle: PathOptions = {
    color: "#464470",
    weight: 7
};

export const tempo30Layer = new L.GeoJSON(<unknown>[] as GeoJsonObject, {
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
        layer.bindPopup(getPopupText(feature, "Tempo 30 Zone"));

    }
});
tempo30Layer.getAttribution = attribution;
