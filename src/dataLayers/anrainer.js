import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";

const normalStyle = {
    color: "#23c796",
    weight: 3,
    opacity: 1
};

const activeStyle = {
    color: "#1b9e77",
    weight: 8
};

export const anrainerLayer = new L.GeoJSON([], {
    style: normalStyle,
    onEachFeature: function(feature, layer) {
        layer.on({
            popupopen: function() {
                layer.setStyle(activeStyle);
            },
            popupclose: function() {
                layer.setStyle(normalStyle);
            }
        });
        layer.bindPopup(getPopupText(feature, "AnrainerInnenparkplatz"));
    }
});
anrainerLayer.getAttribution = attribution;
