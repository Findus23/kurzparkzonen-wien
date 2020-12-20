import {GeoJSON} from "leaflet";

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
    }
}


