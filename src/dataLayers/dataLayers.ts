import {parkstreifenLayer} from "./parkstreifen";
import {parkzonenLayer} from "./parkzonen";
import {anrainerLayer} from "./anrainer";
import {bpLayer} from "./bp";
import {geltungsbereicheLayer} from "./geltungsbereiche";
import {berechtigungszoneLayer} from "./berechtigungszone";

export const dataLayers: { [s: string]: L.GeoJSON } = {
    "Parkstreifen": parkstreifenLayer,
    "Parkzonen": parkzonenLayer,
    "AnrainerInnenparkplätze": anrainerLayer,
    "Behindertenparkplätze": bpLayer,
    "Geltungsbereiche": geltungsbereicheLayer,
    "Berechtigungszone": berechtigungszoneLayer
};

