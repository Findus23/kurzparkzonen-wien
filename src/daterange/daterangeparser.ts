function timeparser(timestring: string): DayRange | Boolean {
    const matches = (/([\d.]+)-([\d.]+)(?:h| Uhr)?/).exec(timestring);
    if (matches) {
        if (matches[1].includes(".") || matches[2].includes(".")) { // todo: too lazy to handle minute math
            return false;
        }
        return {
            startHour: parseInt(matches[1], 10),
            endHour: parseInt(matches[2], 10)
        };
    }
}

export function parseDateRange(rawstring: string): Range | Boolean {
    const result = <Range>{};

    if (!(/Mo|Di|Mi|Do|Fr|Sa|So/).test(rawstring)) {

        result.noday = timeparser(rawstring);
    } else {
        result.noday = false;
        rawstring.split(/[,;]/).forEach(function (day) {
            const parsedTime = timeparser(day);
            if (!parsedTime) {
                return false;
            }
            if (day.includes("Mo") && day.includes("Fr")) {
                result.wd = <DayRange>timeparser(day);
                result.wd.name = "Mo.-Fr.";
            } else if (day.includes("Sa")) {
                result.sa = <DayRange>timeparser(day);
                result.sa.name = "Sa.";
            } else if (day.includes("So")) {
                result.so = <DayRange>timeparser(day);
                result.so.name = "So.";
            }
        });
    }
    if ((Object.keys(result).length === 0 && result.constructor === Object) || result.noday === undefined) {
        return false;
    }
    return result;
}
