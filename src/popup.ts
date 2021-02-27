import {parseDateRange} from "./daterange/daterangeparser";
import {checkInRange} from "./daterange/checkInRange";
import {Feature} from "./interfaces";

const template = require("./popup.ejs");
window.template = template;

function booleanToCheckmark(value: boolean): string {
    if (value) {
        return "Ja"
    }
    return "Nein"
}

export function getPopupText(feature: Feature, type: string): () => string {
    return function () { // only calculate popup text on opening

        // pretty ugly hack to close controll when tapping on layer
        document.getElementsByClassName("leaflet-control-layers")[0].classList.remove("leaflet-control-layers-expanded");
        let dateRange, inRange;
        if (type != "Fußgängerzonen") {
            dateRange = parseDateRange(feature.properties.ZEITRAUM);
            inRange = dateRange ? checkInRange(dateRange).inRange : true;
        } else {
            dateRange = undefined;
            inRange = false;
        }
        const data = {
            prop: feature.properties,
            dateRange: dateRange,
            inRange: inRange,
            type: type,
            booleanToCheckmark:booleanToCheckmark
        };
        return template(data);
    };
}

declare global {
    interface Window {
        template: () => string;
    }
}
