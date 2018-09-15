import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

export const berechtigungszoneLayer = new TopoJsonLayer([], {
    style: {
        color: "#b5874d",
        fillColor: "#ffc760"
    },
    pane: "zonenPane",
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Berechtigungszone"));
    }
});
berechtigungszoneLayer.getAttribution = attribution;
