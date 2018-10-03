import L from "leaflet";
import {getPopupText} from "../popup";
import {attribution} from "../attribution";

const normalStyle = {
    color: "#7570b3",
    weight: 3,
    opacity: 1
};

const activeStyle = {
    color: "#464470",
    weight: 7
};

export const parkstreifenLayer = new L.GeoJSON([], {
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
        layer.bindPopup(getPopupText(feature, "Kurzparkstreifen"));
    }
});
parkstreifenLayer.getAttribution = attribution;
