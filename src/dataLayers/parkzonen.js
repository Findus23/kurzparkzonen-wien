import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

const normalStyle = {
    color: "#687eff",
    fillColor: "#bccaff",
    fillOpacity: 0.3
};
const darkStyle = {
    // color: "#333f96",
    fillColor: "#687eff",
    fillOpacity: 0.9
};

export const parkzonenLayer = new TopoJsonLayer([], {
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
        layer.bindPopup(getPopupText(feature, "Kurzparkzone"));
    }
});
parkzonenLayer.getAttribution = attribution;
