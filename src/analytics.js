import {init} from "@sentry/browser";

function initMatomo(webView) {
    let _paq = _paq || [];
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["setDoNotTrack", true]);
    _paq.push(['setRequestMethod', 'POST']);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    _paq.push(['enableHeartBeatTimer']);
    (function() {
        let u = "https://matomo.lw1.at/";
        _paq.push(['setTrackerUrl', u + 'statistics.php']);
        _paq.push(['setSiteId', '19']);
        let d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.defer = true;
        g.src = u + 'statistics.js';
        s.parentNode.insertBefore(g, s);
    })();
    _paq.push(['setCustomDimension', 1, webView]);
}

function initSentry(webView) {
    init({
        dsn: 'https://7676c0574785409b94c5c9c21daea45d@sentry.lw1.at/9',
    });
}

export const initAnalytics = function() {
    const isWebview = navigator.userAgent.indexOf("Kurzparkzonen") !== -1;
    const optOut = navigator.userAgent.indexOf("PrivateMode") !== -1;
    if (!optOut) {
        initMatomo();
        initSentry()
    }
};
