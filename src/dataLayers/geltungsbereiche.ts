import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";
import {PathOptions} from "leaflet";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#66a61e",
    fillColor: "#9dff2d",
    fillOpacity: 0.3
};
const darkStyle: PathOptions = {
    fillColor: "#66a61e",
    fillOpacity: 0.8
};

// @ts-ignore
export const geltungsbereicheLayer = new TopoJsonLayer(<unknown>[] as GeoJsonObject, {
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
        layer.bindPopup(getPopupText(feature, "Geltungsbereich"));
    }
});
geltungsbereicheLayer.getAttribution = attribution;
