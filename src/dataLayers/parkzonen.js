import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

const normalStyle = {
    color: "#e6ab02",
    fillColor: "#ffc634",
    fillOpacity: 0.2
};
const darkStyle = {
    fillColor: "#e6ab02",
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
