const fs = require("fs");
const path = require("path");
const topojson = require("topojson");
const simplify = require("simplify-geojson");
const geojsonPrecision = require("geojson-precision");
const dataDir = "data/";
const processedDir = "processed/";
const dataFiles = fs.readdirSync(dataDir);

const zeitraum = [];


function totopojson(geojson) {
    const tpj = topojson.topology({foo: geojson}, 1e5);
    const presimplified = topojson.presimplify(tpj);
    const finished = topojson.simplify(presimplified);
    return topojson.filter(finished, topojson.filterWeight);
}


dataFiles.forEach((filename) => {
    if (filename === ".gitkeep" || filename === "checksums.sha256" || filename.includes("formatted")) {
        return false;
    }
    const contents = fs.readFileSync(dataDir + filename);
    const geojson = JSON.parse(contents);
    const nametype = path.parse(filename).name;

    delete geojson.totalFeatures;
    delete geojson.crs;
    geojson.meta = {};
    geojson.features.forEach((feature) => {
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
    });
    let result;
    if (filename === "Behindertenparkplätze.json") {
        geojson.features = geojson.features.filter((feature) => feature.properties.KATEGORIE === 1);

        geojson.features.forEach((feature) => {
            delete feature.properties.KATEGORIE;
            delete feature.properties.KATEGORIE_TXT;
        });

    }
    if (filename.includes("zone") || filename.includes("Geltungsbereiche")) {
        result = totopojson(geojson);
        result = topojson.presimplify(result);
        result = topojson.simplify(result, 1e-9);
        result = topojson.quantize(result, 1e4);
        fs.writeFileSync(processedDir + nametype + ".structure.json", JSON.stringify(result.objects.foo.geometries[0], null, 2));

    } else {
        result = simplify(geojson, 0.01);
        result = geojsonPrecision.parse(result,5);
        fs.writeFileSync(processedDir + nametype + ".structure.json", JSON.stringify(result.features[0], null, 2));

    }

    fs.writeFileSync(processedDir + filename, JSON.stringify(result));
    // fs.writeFileSync("zeitraum.txt", zeitraum.join("\n"));


});


