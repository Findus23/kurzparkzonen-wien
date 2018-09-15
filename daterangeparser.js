function timeparser(timestring) {
    const matches = (/([\d.]+)-([\d.]+)h/).exec(timestring);
    if (matches) {
        return {
            startHour: matches[1],
            endHour: matches[2]
        };
    }

}

module.exports = function (rawstring) {
    const result = {};

    if (!(/Mo|Di|Mi|Do|Fr|Sa|So/).test(rawstring)) {

        result.noday = timeparser(rawstring);
    } else {
        rawstring.split(/[,;]/).forEach(function (day) {
            const parsedTime = timeparser(day);
            if (!parsedTime) {
                return false
            }
            if (day.includes("Mo") && day.includes("Fr")) {
                result.wd = timeparser(day);
            } else if (day.includes("Sa")) {
                result.sa = timeparser(day);

            } else if (day.includes("So")) {
                result.so = timeparser(day);
            }
        });
    }
    if (Object.keys(result).length === 0 && result.constructor === Object
    ) {
        console.log(rawstring);
    }
    return result;
};
