import {parkstreifenLayer} from "./parkstreifen";
import {parkzonenLayer} from "./parkzonen";
import {anrainerLayer} from "./anrainer";
import {bpLayer} from "./bp";
import {geltungsbereicheLayer} from "./geltungsbereiche";
import {berechtigungszoneLayer} from "./berechtigungszone";

export const dataLayers = {
    "Parkstreifen": parkstreifenLayer,
    "Parkzonen": parkzonenLayer,
    "AnrainerInnenparkplätze": anrainerLayer,
    "Behindertenparkplätze": bpLayer,
    "Geltungsbereiche": geltungsbereicheLayer,
    "Berechtigungszone": berechtigungszoneLayer
};

import (/* webpackChunkName: "parkstreifen" */"../../processed/Kurzparkstreifen").then(parkstreifen => {
    parkstreifenLayer.addData(parkstreifen);
});
import (/* webpackChunkName: "bp" */"../../processed/Behindertenparkplätze").then(bp => {
    bpLayer.addData(bp);
});
import (/* webpackChunkName: "anrainer" */"../../processed/AnrainerInnenparkplätze").then(anrainer => {
    anrainerLayer.addData(anrainer);
});
import (/* webpackChunkName: "parkzonen" */"../../processed/Kurzparkzonen").then(parkzonen => {
    parkzonenLayer.addData(parkzonen);
    // const bbox = parkzonen.bbox;
    // map.fitBounds([[bbox[3], bbox[2]], [bbox[1], bbox[0]]]);
});
import (/* webpackChunkName: "geltungsbereiche" */"../../processed/Geltungsbereiche").then(geltungsbereich => {
    geltungsbereicheLayer.addData(geltungsbereich);
});
import (/* webpackChunkName: "berechtigungsZone" */"../../processed/Berechtigungszone").then(berechtigungsZone => {
    berechtigungszoneLayer.addData(berechtigungsZone);
});
