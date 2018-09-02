export function getPopupText(feature, type) {
    const prop = feature.properties;
    let lines = [];
    if (type === "parkstreifen") {
        lines.push(prop.STRNAM + " " + (prop.GELTUNGSBEREICH ? prop.GELTUNGSBEREICH : ""));
    }
    if (type === "anrainer") {
        lines.push(prop.ADRESSE);
        lines.push(prop.STELLPL_ANZ + " Stellplätze");
        lines.push(prop.AUSNAHME_TXT);
    } else if (type === "geltungsbereiche" || type === "berechtigungsZone") {
        lines.push(prop.BEZEICHNUNG);
        if (prop.ANMERKUNG) {
            lines.push(prop.ANMERKUNG);
        }
        lines.push("<small>" + prop.TEXT_RECHT + "</small>")
    } else {
        lines.push(prop.ZEITRAUM);
        lines.push(prop.DAUER);
    }
    return lines.join("<br>");
}
