import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";
import {PathOptions} from "leaflet";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#d95f02",
    fillColor: "#ffaa73",
    fillOpacity: 0.3
};
const darkStyle: PathOptions = {
    fillColor: "#a05002",
    fillOpacity: 0.8
};

// @ts-ignore
export const berechtigungszoneLayer = new TopoJsonLayer(<unknown>[] as GeoJsonObject, {
    style: normalStyle,
    pane: "zonenPane",
    onEachFeature: function (feature: Feature, layer: L.GeoJSON) {
        layer.on({
            popupopen: function () {
                layer.setStyle(darkStyle);
            },
            popupclose: function () {
                layer.setStyle(normalStyle);

            }
        });
        layer.bindPopup(getPopupText(feature, "Berechtigungszone"));
    }
});
berechtigungszoneLayer.getAttribution = attribution;
