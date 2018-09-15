import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";
import {topoJsonLayer} from "../topoJsonLayer";

export const parkzonenLayer = new topoJsonLayer([], {
    style: {
        color: "#687eff",
        fillColor: "#bccaff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.4
    },
    pane: 'zonenPane',
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Kurzparkzone"))
    }
});
parkzonenLayer.getAttribution = attribution;
