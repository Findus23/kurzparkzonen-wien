import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";

export const parkstreifenLayer = new L.GeoJSON([], {
    style: {
        color: "#d300ff",
        weight: 3,
        opacity: 1,
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "Kurzparkstreifen"))
    }
});
parkstreifenLayer.getAttribution = attribution;
