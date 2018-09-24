import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

const normalStyle = {
    color: "#b5874d",
    fillColor: "#ffc760",
    fillOpacity: 0.3
};
const darkStyle = {
    fillColor: "#a27840",
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
