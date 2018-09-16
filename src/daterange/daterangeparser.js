function timeparser(timestring) {
    const matches = (/([\d.]+)-([\d.]+)(?:h| Uhr)?/).exec(timestring);
    if (matches) {
        if (matches[1].includes(".") || matches[2].includes(".")) { // todo: too lazy to handle minute math
            return false
        }
        return {
            startHour: parseInt(matches[1]),
            endHour: parseInt(matches[2])
        };
    }

}

export function parseDateRange(rawstring) {
    const result = {};

    if (!(/Mo|Di|Mi|Do|Fr|Sa|So/).test(rawstring)) {

        result.noday = timeparser(rawstring);
    } else {
        rawstring.split(/[,;]/).forEach(function(day) {
            const parsedTime = timeparser(day);
            if (!parsedTime) {
                return false
            }
            if (day.includes("Mo") && day.includes("Fr")) {
                result.wd = timeparser(day);
                result.wd.name = "Mo.-Fr."
            } else if (day.includes("Sa")) {
                result.sa = timeparser(day);
                result.sa.name = "Sa."
            } else if (day.includes("So")) {
                result.so = timeparser(day);
                result.so.name = "So."
            }
        });
    }
    return result;
}
