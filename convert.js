const fs = require('fs');
const path = require('path');
const topojson = require('topojson');
const simplify = require('simplify-geojson');

const dataDir = 'data/';
const processedDir = 'processed/';
const dataFiles = fs.readdirSync(dataDir);

function totopojson(geojson) {
    let tpj = topojson.topology({foo: geojson}, 1e5);
    let presimplified = topojson.presimplify(tpj);
    let finished = topojson.simplify(presimplified);
    return topojson.filter(finished, topojson.filterWeight);
}


dataFiles.forEach(filename => {
    const contents = fs.readFileSync(dataDir + filename);
    const geojson = JSON.parse(contents);
    const nametype = path.parse(filename).name;

    delete geojson.totalFeatures;
    delete geojson.crs;
    geojson.meta = {};
    geojson.features.forEach(feature => {
        delete feature.properties["SE_ANNO_CAD_DATA"];
        geojson.meta.WEITERE_INF = feature.properties.WEITERE_INF;
        geojson.meta.WEBLINK1 = feature.properties.WEBLINK1;
        geojson.meta.WEBLINK2 = feature.properties.WEBLINK2;
        delete feature.properties.WEITERE_INF;
        delete feature.properties.WEBLINK1;
        delete feature.properties.WEBLINK2;
        delete feature.properties.BEZIRK2;
        delete feature.id;
        delete feature.properties["SE_SDO_ROWID"];
    });
    let result;
    if (filename === "Behindertenparkplätze.json") {
        geojson.features = geojson.features.filter(feature => {
            return feature.properties.KATEGORIE === 1
        });

        geojson.features.forEach(feature => {
            delete feature.properties.KATEGORIE;
            delete feature.properties.KATEGORIE_TXT;
        });

    }
    if (filename.includes("zone") || filename.includes("Geltungsbereiche")) {
        result = totopojson(geojson)
    } else {
        result = simplify(geojson, 0.01)
    }

    fs.writeFileSync(processedDir + filename, JSON.stringify(result));


});


