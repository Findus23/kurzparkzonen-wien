import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";

export const anrainerLayer = new L.GeoJSON([], {
    style: {
        color: "#ff9000",
        weight: 3,
        opacity: 1
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(getPopupText(feature, "AnrainerInnenparkplatz"));
    }
});
anrainerLayer.getAttribution = attribution;
