import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";
import {GeoJSON, PathOptions} from "leaflet";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#e6ab02",
    fillColor: "#ffc634",
    fillOpacity: 0.2
};
const darkStyle: PathOptions = {
    fillColor: "#e6ab02",
    fillOpacity: 0.9
};

// @ts-ignore
export const parkzonenLayer = new TopoJsonLayer(<unknown>[] as GeoJsonObject, {
    style: normalStyle,
    pane: "zonenPane",
    onEachFeature: function (feature: Feature, layer: GeoJSON) {
        layer.on({
            popupopen: function () {
                layer.setStyle(darkStyle);
            },
            popupclose: function () {
                layer.setStyle(normalStyle);

            }
        });
        layer.bindPopup(getPopupText(feature, "Kurzparkzone"));
    }
});
parkzonenLayer.getAttribution = attribution;
