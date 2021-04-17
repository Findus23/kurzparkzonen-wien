export const isWebview = navigator.userAgent.indexOf("Kurzparkzonen") !== -1;
export const isOlderAndroid = navigator.userAgent.indexOf("OlderAndroid") !== -1;
export const optOut = navigator.userAgent.indexOf("PrivateMode") !== -1;


function initMatomo() {
// eslint-disable-next-line no-use-before-define
    // @ts-ignore
    const _paq: [[any, any, any] | [any, any] | [any]] = _paq || [];
    window._paq = _paq;
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(['disableCookies']);
    _paq.push(["setDoNotTrack", true]);
    _paq.push(["setRequestMethod", "POST"]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    _paq.push(["enableHeartBeatTimer"]);
    (function () {
        const u = "https://matomo.lw1.at/";
        _paq.push(["setTrackerUrl", u + "statistics.php"]);
        _paq.push(["setSiteId", "19"]);
        const script = document.createElement("script");
        const firstScript = document.getElementsByTagName("script")[0];
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = u + "statistics.js";
        if (firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
        }
    })();
    _paq.push(["setCustomDimension", 1, isWebview]);
}


export function initAnalytics() {
    if (!optOut) {
        initMatomo();
    }
}


declare global {
    interface Window {
        _paq: paq;
    }
}

declare type paq = [[any, any, any] | [any, any] | [any]]
