export function checkInRange(range) {
    const now = new Date();
    const n = now.getDay();
    const hour = now.getHours();
    let dayrange;
    if (range.noday) {
        dayrange = range.noday;
    } else if (n >= 1 && n <= 5) {
        if (!range.wd) {
            return {inRange: false};
        }
        dayrange = range.wd;
    } else if (n > 5) {
        if (!range.sa) {
            return {inRange: false};
        }
        dayrange = range.sa;
    } else {
        if (!range.so) {
            return {inRange: false};
        }
        dayrange = range.so;
    }
    const inRange = dayrange.startHour < hour && hour < dayrange.endHour;
    return {
        inRange: inRange
    };
}
