export function getPopupText(feature, type) {
    const prop = feature.properties;
    const lines = [];
    if (type === "Kurzparkstreifen") {
        lines.push(prop.STRNAM + " " + (prop.GELTUNGSBEREICH ? prop.GELTUNGSBEREICH : ""));
    }
    if (type === "AnrainerInnenparkplatz") {
        lines.push(prop.ADRESSE);
        lines.push(prop.STELLPL_ANZ + " Stellplätze");
        lines.push(prop.AUSNAHME_TXT);
    } else if (type === "Geltungsbereich" || type === "Berechtigungszone") {
        lines.push(prop.BEZEICHNUNG);
        if (prop.ANMERKUNG) {
            lines.push(prop.ANMERKUNG);
        }
        lines.push("<small>" + prop.TEXT_RECHT + "</small>");
    } else {
        lines.push(prop.ZEITRAUM);
        lines.push(prop.DAUER);
    }
    return "<h2>" + type + "</h2>" + lines.join("<br>");
}
