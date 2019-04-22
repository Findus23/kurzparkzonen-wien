import {parseDateRange} from "./daterange/daterangeparser";
import {checkInRange} from "./daterange/checkInRange";
import {Feature} from "./interfaces";

const template = require("./popup.ejs");
window.template = template;

export function getPopupText(feature:Feature, type: string): () => string {
    return function () { // only calculate popup text on opening

        // pretty ugly hack to close controll when tapping on layer
        document.getElementsByClassName("leaflet-control-layers")[0].classList.remove("leaflet-control-layers-expanded");
        const dateRange = parseDateRange(feature.properties.ZEITRAUM);
        const inRange = dateRange ? checkInRange(dateRange).inRange : true;
        const data = {
            prop: feature.properties,
            dateRange: dateRange,
            inRange: inRange,
            type: type
        };
        return template(data);
    };
}

declare global {
    interface Window {
        template: () => string;
    }
}