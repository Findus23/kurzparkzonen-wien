import L from "leaflet";
import {attribution} from "../attribution";
import {getPopupText} from "../popup";

export const bpLayer = new L.GeoJSON([], {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 2,
            fillColor: "#16ff00",
            color: "#16ff00"
        }).bindPopup(getPopupText(feature, "Behindertenparkplätze"));
    }
});
bpLayer.getAttribution = attribution;
