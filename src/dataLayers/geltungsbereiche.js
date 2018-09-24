import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

const normalStyle = {
    color: "#56b556",
    fillColor: "#6eff6e",
    fillOpacity: 0.3
};
const darkStyle = {
    fillColor: "#419741",
    fillOpacity: 0.8
};

export const geltungsbereicheLayer = new TopoJsonLayer([], {
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
        layer.bindPopup(getPopupText(feature, "Geltungsbereich"));
    }
});
geltungsbereicheLayer.getAttribution = attribution;
