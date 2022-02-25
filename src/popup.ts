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

        // pretty ugly hack to close control when tapping on layer
        document.getElementsByClassName("leaflet-control-layers")[0].classList.remove("leaflet-control-layers-expanded");
        let dateRange, inRange;
        if (type != "Fußgängerzonen") {
            dateRange = parseDateRange(feature.properties.ZEITRAUM);
            inRange = dateRange ? checkInRange(dateRange).inRange : true;
        } else {
            dateRange = undefined;
            inRange = false;
        }
        let date: Date = new Date();
        let showDate = false;
        let now = Date.now();
        if (feature.properties.GUELTIG_VON) {
            date = new Date(feature.properties.GUELTIG_VON.replace("Z", ""))
            let diff = Math.abs(now - date.getTime())
            showDate = diff < 1000 * 60 * 60 * 24 * 60
            console.info(showDate)
        }
        const data = {
            prop: feature.properties,
            dateRange: dateRange,
            inRange: inRange,
            type: type,
            booleanToCheckmark: booleanToCheckmark,
            showDate: showDate,
            date: date.toLocaleDateString()
        };
        return template(data);
    };
}

declare global {
    interface Window {
        template: () => string;
    }
}
