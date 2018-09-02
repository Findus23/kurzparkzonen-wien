import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import * as topojson from "topojson-client";
import {getPopupText} from "./popup";
import apiKey from "./apikey"; //optional
require('leaflet.locatecontrol');


document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;
    let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    let Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: apiKey,
        maxZoom: 22
    });
    let Thunderforest_Outdoors = L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        apikey: apiKey,
        maxZoom: 22
    });  
    let BasemapAT_basemap = L.tileLayer('https://maps{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.{format}', {
        maxZoom: 20,
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
        subdomains: ["", "1", "2", "3", "4"],
        format: 'png',
        bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
    });
    let blankLayer = L.tileLayer('').addTo(map);
    let LeafIcon = L.Icon.extend({
        options: {
            iconAnchor: [16, 35],
            popupAnchor: [0, -35]
        }
    });

    let categories = {},
        category;

    let mapLayers = {
        "Leer": blankLayer,
        'Standard': OpenStreetMap_Mapnik,
        "Wanderkarte": Thunderforest_Outdoors,
        "Fahrradkarte": Thunderforest_OpenCycleMap,
        "Basemap.at": BasemapAT_basemap
    };

    let attribution = function() {
        return 'Icons von <a href="https://mapicons.mapsmarker.com">mapicons.mapsmarker.com</a> ' +
            '(<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY SA 3.0</a>)' + " | " +
            '<a href="main.licenses.txt" target="_blank">Lizenzen</a> + ' +
            '<a href="https://github.com/Findus23/POI-Schiltern" target="_blank">Source</a>' +
            ' | <a href="https://www.ferienhaus-schiltern.at/impressum/" target="_blank">Impressum und Datenschutz</a>';
    };
    let overlays = {};
    let categoryName, categoryArray, categoryLG;

    L.TopoJSON = L.GeoJSON.extend({
        addData: function(jsonData) {
            if (jsonData.type === 'Topology') {
                for (let key in jsonData.objects) {
                    let geojson = topojson.feature(jsonData, jsonData.objects[key]);
                    L.GeoJSON.prototype.addData.call(this, geojson);
                }
            }
            else {
                L.GeoJSON.prototype.addData.call(this, jsonData);
            }
            return this;
        }
    });
    const parkzonenStyle = {
        color: "#687eff",
        fillColor: "#bccaff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.4
    };
    const parkstreifenStyle = {
        color: "#d300ff",
        weight: 3,
        opacity: 1,
    };
    const anrainerStyle = {
        color: "#ff9000",
        weight: 3,
        opacity: 1,
    };
    const bpMarkerOptions = {
        radius: 2,
        fillColor: "#16ff00",
        color: "#16ff00",
    };
    map.createPane('zonenPane');
    map.getPane('zonenPane').style.zIndex = "300";
    let parkstreifenLayer = new L.GeoJSON([], {
        style: parkstreifenStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "parkstreifen"))
        }
    }).addTo(map);
    import (/* webpackChunkName: "parkstreifen" */"../processed/Kurzparkstreifen").then(parkstreifen => {
        parkstreifenLayer.addData(parkstreifen);
    });
    let bpLayer = new L.GeoJSON([], {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, bpMarkerOptions);
        },

    });
    import (/* webpackChunkName: "bp" */"../processed/Behindertenparkplätze").then(bp => {
        bpLayer.addData(bp);
    });
    let anrainerLayer = new L.GeoJSON([], {
        style: anrainerStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "anrainer"))
        }
    }).addTo(map);
    import (/* webpackChunkName: "anrainer" */"../processed/AnrainerInnenparkplätze").then(anrainer => {
        anrainerLayer.addData(anrainer);
    });
    let parkzonenLayer = new L.TopoJSON([], {
        style: parkzonenStyle,
        pane: 'zonenPane',
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "parkzonen"))
        }
    }).addTo(map);
    import (/* webpackChunkName: "parkzonen" */"../processed/Kurzparkzonen").then(parkzonen => {
        parkzonenLayer.addData(parkzonen);
        const bbox = parkzonen.bbox;
        map.fitBounds([[bbox[3], bbox[2]], [bbox[1], bbox[0]]]);
    });

    let geltungsbereicheLayer = new L.TopoJSON([], {
        style: parkzonenStyle,
        pane: 'zonenPane',
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "geltungsbereiche"))
        }
    });
    import (/* webpackChunkName: "geltungsbereiche" */"../processed/Geltungsbereiche").then(geltungsbereich => {
        geltungsbereicheLayer.addData(geltungsbereich);
    });
    let berechtigungsZoneLayer = new L.TopoJSON([], {
        style: parkzonenStyle,
        pane: 'zonenPane',
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "berechtigungsZone"))
        }
    });
    import (/* webpackChunkName: "berechtigungsZone" */"../processed/Berechtigungszone").then(berechtigungsZone => {
        berechtigungsZoneLayer.addData(berechtigungsZone);
    });
    let parkLayers = {
        "Parkstreifen": parkstreifenLayer,
        "Parkzonen": parkzonenLayer,
        "AnrainerInnenparkplätze": anrainerLayer,
        "Behindertenparkplätze": bpLayer,
        "Geltungsbereiche": geltungsbereicheLayer,
        "Berechtigungszone": berechtigungsZoneLayer
    };
    let control = L.control.layers(mapLayers, parkLayers).addTo(map);
    map.on('overlayadd overlayremove', function(e) {
        console.info(e);
    });

    L.control.locate().addTo(map);
}, false);
