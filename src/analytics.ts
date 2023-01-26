import {isDoNotTrackEnabled} from "matomo-lite-tracker/src/util"
import {MatomoLiteTracker} from "matomo-lite-tracker/src/tracker"
import {PerformanceMetric} from "matomo-lite-tracker/src/performancetracking"
import {BrowserFeatures} from "matomo-lite-tracker/src/browserfeatures"
import {enableLinkTracking} from "matomo-lite-tracker/src/linktracking"

export const isWebview = navigator.userAgent.indexOf("Kurzparkzonen") !== -1;
export const isOlderAndroid = navigator.userAgent.indexOf("OlderAndroid") !== -1;
export const optOut = navigator.userAgent.indexOf("PrivateMode") !== -1;


function initMatomo() {
    const m = new MatomoLiteTracker("https://matomo.lw1.at", 19)
    m.phpFileName = "statistics.php"
// eslint-disable-next-line no-use-before-define
    // @ts-ignore
    m.performanceMetric = new PerformanceMetric()

    m.browserFeatures = new BrowserFeatures()

    enableLinkTracking(m, [])
    m.trackPageview()
}


export function initAnalytics() {
    if (!optOut || isDoNotTrackEnabled()) {
        initMatomo();
    }
}


