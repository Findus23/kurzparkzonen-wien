import L, {GeoJSON} from "leaflet";

export interface Feature extends GeoJSON.Feature {
    properties: {
        ZEITRAUM: string

        KATEGORIE?: number
        KATEGORIE_TXT?: number
        SE_ANNO_CAD_DATA?: string
        WEITERE_INF?: string
        WEBLINK1?: string
        WEBLINK_1?: string
        WEBLINK2?: string
        BEZIRK2?: string
        PRB_ID?: string
        FK_PRB?: string
        OBJECTID?: string
        SE_SDO_ROWID?: string

        //Garagen
        GARAGE_ID?: string
        BETREIBER?: string
        ID?: number
        PLZ?: number
        ORT?: string
        WEBLINK_BETR_DE?: string
        WEBLINK_BETR_EN?: string
        WEBLINK_WK_DE?: string
        WEBLINK_WK_EN?: string
        PARK_AND_RIDE?: string
        BEHINDERTENPARKPL?: string
        PAR?: boolean
        BPL?: boolean

        // Tempo 30
        ZONE_NAME?: string
        RECHT_TXT?: string

        // Verkaufsstellen
        TYP?: string
    }
}

export interface ExtendedMap extends L.Map {
    _popup?: L.Map | null
}

