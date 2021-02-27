import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";
import {PathOptions} from "leaflet";
import {Feature} from "../interfaces";
import {GeoJsonObject} from "geojson";

const normalStyle: PathOptions = {
    color: "#b502e6",
    fillColor:"#c78de0",
    fillOpacity: 0.2
};
const darkStyle: PathOptions = {
    fillColor: "#b502e6",
    fillOpacity: 0.9
};

// @ts-ignore
export const fusgangerLayer = new TopoJsonLayer(<unknown>[] as GeoJsonObject, {
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
        layer.bindPopup(getPopupText(feature, "Fußgängerzonen"));
    }
});
fusgangerLayer.getAttribution = attribution;
