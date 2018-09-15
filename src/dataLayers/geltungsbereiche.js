import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {TopoJsonLayer} from "../topoJsonLayer";

export const geltungsbereicheLayer = new TopoJsonLayer([], {
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
