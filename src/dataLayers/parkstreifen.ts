import {GeoJSON, PathOptions} from "leaflet";
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

export const parkstreifenLayer = new GeoJSON(<unknown>[] as GeoJsonObject, {
    style: normalStyle,
    onEachFeature: function (feature: Feature, layer: GeoJSON) {
        layer.on({
            popupopen: function () {
                layer.setStyle(activeStyle);
            },
            popupclose: function () {
                layer.setStyle(normalStyle);

            }
        });
        layer.bindPopup(getPopupText(feature, "Kurzparkstreifen"));
    }
});
parkstreifenLayer.getAttribution = attribution;
