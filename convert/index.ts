import {Feature} from "../src/interfaces";

import {presimplify, simplify} from "topojson-simplify"
import {quantize} from "topojson-client";
import {topology} from "topojson-server";

import {reduce_precision} from "../geojson-precision"
import {readdirSync, readFileSync, writeFileSync} from "fs";

const dataDir = "../data/";
const processedDir = "../processed/";
const dataFiles = readdirSync(dataDir);

function toBoolean(text: string | undefined): boolean | undefined {
    switch (text) {
        case "Y":
            return true
        case "N":
            return false
        default:
            return
    }
}


dataFiles.forEach((filename: string) => {
    if (filename === ".gitkeep" || filename === "checksums.sha256" || filename.includes("formatted")) {
        return false;
    }
    console.log("converting " + filename)
    const contents = readFileSync(dataDir + filename).toString();
    const geojson = JSON.parse(contents);
    // const nametype = path.parse(filename).name;

    delete geojson.totalFeatures;
    delete geojson.crs;
    geojson.meta = {};
    geojson.features.forEach((feature: Feature) => {
        delete feature.properties.SE_ANNO_CAD_DATA;
        geojson.meta.WEITERE_INF = feature.properties.WEITERE_INF;
        geojson.meta.WEBLINK1 = feature.properties.WEBLINK1;
        geojson.meta.WEBLINK2 = feature.properties.WEBLINK2;
        delete feature.properties.WEITERE_INF;
        delete feature.properties.WEBLINK1;
        delete feature.properties.WEBLINK_1;
        delete feature.properties.WEBLINK2;
        delete feature.properties.BEZIRK2;
        delete feature.properties.OBJECTID;
        delete feature.properties.PRB_ID;
        delete feature.properties.FK_PRB;
        delete feature.id;
        delete feature.properties.SE_SDO_ROWID;
        delete feature.properties.RECHT_TXT
        if (feature.properties.GARAGE_ID) {
            delete feature.properties.PLZ
            delete feature.properties.ORT
            feature.properties.ID = parseInt(feature.properties.GARAGE_ID)
            delete feature.properties.GARAGE_ID
            feature.properties.PAR = toBoolean(feature.properties.PARK_AND_RIDE)
            delete feature.properties.PARK_AND_RIDE
            feature.properties.BPL = toBoolean(feature.properties.BEHINDERTENPARKPL)
            delete feature.properties.BEHINDERTENPARKPL
            delete feature.properties.WEBLINK_BETR_DE
            delete feature.properties.WEBLINK_BETR_EN
            delete feature.properties.WEBLINK_WK_DE
            delete feature.properties.WEBLINK_WK_EN
        }
    });
    let result;
    if (filename === "Behindertenparkplätze.json") {
        geojson.features = geojson.features.filter((feature: Feature) => feature.properties.KATEGORIE === 1);

        geojson.features.forEach((feature: Feature) => {
            delete feature.properties.KATEGORIE;
            delete feature.properties.KATEGORIE_TXT;
        });

    }
    if (filename.includes("zone") || filename.includes("Geltungsbereiche")) {
        result = topology({foo: geojson}, 1e5);
        // @ts-ignore
        result = presimplify(result);
        result = simplify(result, 1e-9);
        result = quantize(result, 1e4);
        // fs.writeFileSync(processedDir + nametype + ".structure.json", JSON.stringify(result.objects.foo.geometries[0], null, 2));

    } else {
        result = reduce_precision(geojson, 5);
        // fs.writeFileSync(processedDir + nametype + ".structure.json", JSON.stringify(result.features[0], null, 2));

    }

    writeFileSync(processedDir + filename, JSON.stringify(result));


});


