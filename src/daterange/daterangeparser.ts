function timeparser(timestring: string): DayRange | undefined {
    const matches = (/([\d.]+)-([\d.]+)(?:h| Uhr)?/).exec(timestring);
    if (matches) {
        if (matches[1].includes(".") || matches[2].includes(".")) { // todo: too lazy to handle minute math
            return;
        }
        return {
            startHour: parseInt(matches[1], 10),
            endHour: parseInt(matches[2], 10)
        };
    }
    return;
}

export function parseDateRange(rawstring: string): RangeSet | undefined {
    const result = {} as RangeSet;

    if (!(/Mo|Di|Mi|Do|Fr|Sa|So/).test(rawstring)) {

        result.noday = timeparser(rawstring);
    } else {
        result.noday = undefined;
        rawstring.split(/[,;]/).forEach(function (day) {
            const parsedTime = timeparser(day);
            if (!parsedTime) {
                return false;
            }
            if (day.includes("Mo") && day.includes("Fr")) {
                result.wd = timeparser(day);
                if (result.wd) {
                    result.wd.name = "Mo.-Fr.";
                }
            } else if (day.includes("Sa")) {
                result.sa = timeparser(day);
                if (result.sa) {
                    result.sa.name = "Sa.";
                }
            } else if (day.includes("So")) {
                result.so = timeparser(day);
                if (result.so) {
                    result.so.name = "So.";
                }
            }
        });
    }
    if ((Object.keys(result).length === 0 && result.constructor === Object)) {
        return;
    }
    return result;
}
