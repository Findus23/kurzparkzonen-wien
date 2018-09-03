import "leaflet/dist/leaflet.css";
import "./style.css";
import L from "leaflet";
import * as topojson from "topojson-client";
import {getPopupText} from "./popup";
import * as tiles from "./tilelayers";
import apiKey from "./apikey"; //optional
require('leaflet.locatecontrol');


document.addEventListener('DOMContentLoaded', function() {
    let map = L.map('map').setView([48.203527523471344, 16.37383544767511], 12);
    window.map = map;

    let blankLayer = L.tileLayer('');
    let LeafIcon = L.Icon.extend({
        options: {
            iconAnchor: [16, 35],
            popupAnchor: [0, -35]
        }
    });
    if (process.env.NODE_ENV === 'production') {
        tiles.BasemapAT_basemap.addTo(map);
    } else {
        blankLayer.addTo(map);
    }


    let mapLayers = {
        "Leer": blankLayer,
        "Basemap.at": tiles.BasemapAT_basemap,
        'Standard-OSM': tiles.OpenStreetMap_Mapnik,
        "Wanderkarte": tiles.Thunderforest_Outdoors,
        "Fahrradkarte": tiles.Thunderforest_OpenCycleMap,
        "Öffi": tiles.Thunderforest_Transport,
        "Schwarz-Weiß": tiles.Stamen_TonerLite,
    };

    let attribution = function() {
        return 'Icons von <a href="https://mapicons.mapsmarker.com">mapicons.mapsmarker.com</a> ' +
            '(<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC BY SA 3.0</a>)' + " | " +
            '<a href="main.licenses.txt" target="_blank">Lizenzen</a> + ' +
            '<a href="https://github.com/Findus23/POI-Schiltern" target="_blank">Source</a>' +
            ' | <a href="https://www.ferienhaus-schiltern.at/impressum/" target="_blank">Impressum und Datenschutz</a>';
    };

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
            layer.bindPopup(getPopupText(feature, "Kurzparkstreifen"))
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
            layer.bindPopup(getPopupText(feature, "AnrainerInnenparkplatz"))
        }
    }).addTo(map);
    import (/* webpackChunkName: "anrainer" */"../processed/AnrainerInnenparkplätze").then(anrainer => {
        anrainerLayer.addData(anrainer);
    });
    let parkzonenLayer = new L.TopoJSON([], {
        style: parkzonenStyle,
        pane: 'zonenPane',
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "Kurzparkzone"))
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
            layer.bindPopup(getPopupText(feature, "Geltungsbereich"))
        }
    });
    import (/* webpackChunkName: "geltungsbereiche" */"../processed/Geltungsbereiche").then(geltungsbereich => {
        geltungsbereicheLayer.addData(geltungsbereich);
    });
    let berechtigungsZoneLayer = new L.TopoJSON([], {
        style: parkzonenStyle,
        pane: 'zonenPane',
        onEachFeature: function(feature, layer) {
            layer.bindPopup(getPopupText(feature, "Berechtigungszone"))
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
