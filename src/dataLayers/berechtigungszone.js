import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

const normalStyle = {
    color: "#d95f02",
    fillColor: "#ffaa73",
    fillOpacity: 0.3
};
const darkStyle = {
    fillColor: "#a05002",
    fillOpacity: 0.8
};

export const berechtigungszoneLayer = new TopoJsonLayer([], {
    style: normalStyle,
    pane: "zonenPane",
    onEachFeature: function (feature, layer) {
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
