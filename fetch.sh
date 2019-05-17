#!/bin/bash
cd data
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENVERKAUFOGD,ogdwien:PARKENAUTOMATOGD&srsName=EPSG:4326&outputFormat=json&sortBy=OBJECTID" -o Verkaufsstellen.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:GARAGENOGD&srsName=EPSG:4326&outputFormat=json&sortBy=OBJECTID" -o pr.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&srsName=EPSG:4326&outputFormat=json&typeName=ogdwien:PARKENANRAINEROGD&sortBy=OBJECTID" -o AnrainerInnenparkplätze.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:KURZPARKSTREIFENOGD&srsName=EPSG:4326&outputFormat=json&sortBy=SE_SDO_ROWID" -o Kurzparkstreifen.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:KURZPARKZONEOGD&srsName=EPSG:4326&outputFormat=json&sortBy=SE_SDO_ROWID" -o Kurzparkzonen.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:BEHINDERTENPARKPLATZOGD&srsName=EPSG:4326&outputFormat=json&sortBy=SE_SDO_ROWID" -o Behindertenparkplätze.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENGELTUNGOGD&srsName=EPSG:4326&outputFormat=json&sortBy=OBJECTID" -o Geltungsbereiche.json
sleep 5
curl "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:PARKENBERECHTOGD&srsName=EPSG:4326&outputFormat=json&sortBy=OBJECTID" -o Berechtigungszone.json

sha256sum *.json > checksums.sha256

for i in *.json
do
	cat $i | jq -S . > $i.formatted.json
done
