import L from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";

export const bpLayer = new L.GeoJSON([], {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 2,
            fillColor: "#a6761d",
            color: "#a6761d"
        }).bindPopup(getPopupText(feature, "Behindertenparkplätze"));
    }
});
bpLayer.getAttribution = attribution;
