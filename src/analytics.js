import {init} from "@sentry/browser";

function initMatomo(webView) {
// eslint-disable-next-line no-use-before-define
    const _paq = _paq || [];
    window._paq = _paq;
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setDoNotTrack", true]);
    _paq.push(["setRequestMethod", "POST"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    _paq.push(["enableHeartBeatTimer"]);
    (function() {
        const u = "https://matomo.lw1.at/";
        _paq.push(["setTrackerUrl", u + "statistics.php"]);
        _paq.push(["setSiteId", "19"]);
        const script = document.createElement("script");
        const firstScript = document.getElementsByTagName("script")[0];
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = u + "statistics.js";
        firstScript.parentNode.insertBefore(script, firstScript);
    })();
    _paq.push(["setCustomDimension", 1, webView]);
}

function initSentry() {
    init({
        dsn: "https://7676c0574785409b94c5c9c21daea45d@sentry.lw1.at/9"
    });
}

export const initAnalytics = function() {
    const isWebview = navigator.userAgent.indexOf("Kurzparkzonen") !== -1;
    const optOut = navigator.userAgent.indexOf("PrivateMode") !== -1;
    if (!optOut) {
        initMatomo(isWebview);
        initSentry();
    }
};
