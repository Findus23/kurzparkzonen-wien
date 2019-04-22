export function checkInRange(range: RangeSet): RangeResult {
    const now = new Date();
    const n = now.getDay();
    const hour = now.getHours();
    let dayrange: DayRange;
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


declare global {
    interface RangeSet {
        noday: DayRange | undefined
        wd: DayRange | undefined
        sa: DayRange | undefined
        so: DayRange | undefined
    }

    interface DayRange {
        startHour: number,
        endHour: number,
        name?: string
    }

    interface RangeResult {
        inRange: boolean
    }
}