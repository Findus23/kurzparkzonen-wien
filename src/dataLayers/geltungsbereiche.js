import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {topoJsonLayer} from "../topoJsonLayer";

export const geltungsbereicheLayer = new topoJsonLayer([], {
    style: {
        color: "#56b556",
        fillColor: "#6eff6e",
    },
    pane: 'zonenPane',
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Geltungsbereich"))
    }
});
geltungsbereicheLayer.getAttribution = attribution;
