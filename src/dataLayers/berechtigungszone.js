import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {topoJsonLayer} from "../topoJsonLayer";

export const berechtigungszoneLayer = new topoJsonLayer([], {
    style: {
        color: "#b5874d",
        fillColor: "#ffc760",
    },
    pane: 'zonenPane',
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Berechtigungszone"))
    }
});
berechtigungszoneLayer.getAttribution = attribution;
