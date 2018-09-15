import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {topoJsonLayer} from "../topoJsonLayer";

export const geltungsbereicheLayer = new topoJsonLayer([], {
    style: {},
    pane: 'zonenPane',
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Geltungsbereich"))
    }
});
geltungsbereicheLayer.getAttribution = attribution;
