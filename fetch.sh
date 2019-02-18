#!/bin/bash
cd data
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENVERKAUFOGD,ogdwien:PARKENAUTOMATOGD&srsName=EPSG:4326&outputFormat=json" -o Verkaufsstellen.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:GARAGENOGD&srsName=EPSG:4326&outputFormat=json" -o pr.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:PARKENANRAINEROGD" -o AnrainerInnenparkplätze.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:KURZPARKSTREIFENOGD&srsName=EPSG:4326&outputFormat=json" -o Kurzparkstreifen.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:KURZPARKZONEOGD&srsName=EPSG:4326&outputFormat=json" -o Kurzparkzonen.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEHINDERTENPARKPLATZOGD&srsName=EPSG:4326&outputFormat=json" -o Behindertenparkplätze.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENGELTUNGOGD&srsName=EPSG:4326&outputFormat=json" -o Geltungsbereiche.json
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENBERECHTOGD&srsName=EPSG:4326&outputFormat=json" -o Berechtigungszone.json

sha256sum *.json > checksums.sha256

