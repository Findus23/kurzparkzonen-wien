import {parseDateRange} from "./daterange/daterangeparser";
import {checkInRange} from "./daterange/checkInRange";

const template = require("./popup.ejs");
window.template=template;
function printRange(range, name) {
    return name + ": " + range.startHour + "-" + range.endHour
}

export function getPopupText(feature, type) {
    return function() { // only calculate popup text on opening
        const dateRange = parseDateRange(feature.properties.ZEITRAUM);
        if (dateRange) {
            const inRange = checkInRange(dateRange);
        }
        const data = {
            prop: feature.properties,
            dateRange: dateRange,
            type: type
        };
        return template(data);

        const lines = [];
        if (type === "Kurzparkstreifen") {
            lines.push(prop.STRNAM + " " + (prop.GELTUNGSBEREICH ? prop.GELTUNGSBEREICH : ""));
        }
        if (type === "AnrainerInnenparkplatz") {
            lines.push(prop.ADRESSE);
            lines.push(prop.STELLPL_ANZ + " Stellplätze");
            lines.push(prop.AUSNAHME_TXT);
        } else if (type === "Geltungsbereich" || type === "Berechtigungszone") {
            lines.push(prop.BEZEICHNUNG);
            if (prop.ANMERKUNG) {
                lines.push(prop.ANMERKUNG);
            }
            lines.push("<small>" + prop.TEXT_RECHT + "</small>");
        } else {
            if (dateRange.wd) {
                lines.push(printRange(dateRange.wd, "Mo. bis Fr."))
            }
            if (dateRange.sa) {
                lines.push(printRange(dateRange.sa, "Sa."))
            }
            if (dateRange.so) {
                lines.push(printRange(dateRange.so, "So."))
            }
            lines.push(prop.ZEITRAUM);
            lines.push(prop.DAUER);
        }
        return "<h2>" + type + "</h2>" + lines.join("<br>");
    }
}
