import {parkstreifenLayer} from "./parkstreifen";
import {parkzonenLayer} from "./parkzonen";
import {anrainerLayer} from "./anrainer";
import {bpLayer} from "./bp";
import {geltungsbereicheLayer} from "./geltungsbereiche";
import {berechtigungszoneLayer} from "./berechtigungszone";
import {carsharingLayer} from "./carsharing";
import {fusgangerLayer} from "./fusganger";
import {garagenLayer} from "./garagen";
import {tempo30Layer} from "./tempo30";
import {verkaufsstellenLayer} from "./verkaufsstellen";
import {GeoJSON} from "leaflet";

export const dataLayers: { [s: string]: GeoJSON } = {
    "Parkzonen": parkzonenLayer,
    "Parkstreifen": parkstreifenLayer,
    "Verkaufsstellen": verkaufsstellenLayer,
    "Garagen": garagenLayer,
    "Behindertenparkplätze": bpLayer,
    "AnrainerInnenparkplätze": anrainerLayer,
    "Geltungsbereiche": geltungsbereicheLayer,
    "Berechtigungszone": berechtigungszoneLayer,
    "Carsharing": carsharingLayer,
    "Fußgängerzonen": fusgangerLayer,
    "Tempo 30 Zone": tempo30Layer,
};

