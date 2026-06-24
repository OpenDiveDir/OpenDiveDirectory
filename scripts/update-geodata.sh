#!/usr/bin/sh

wget 'https://github.com/OpenDiveDir/GeoData/blob/main/geodata/dive-centers.geojson?raw=true' --output-document=/srv/odd/public/geodata/odd/dive-centers.geojson
wget 'https://github.com/OpenDiveDir/GeoData/blob/main/geodata/dive-sites.geojson?raw=true' --output-document=/srv/odd/public/geodata/odd/dive-sites.geojson
wget 'https://github.com/OpenDiveDir/GeoData/blob/main/geodata/dive-clubs.geojson?raw=true' --output-document=/srv/odd/public/geodata/odd/dive-clubs.geojson
wget 'https://github.com/OpenDiveDir/GeoData/blob/main/geodata/hyperbaric-chambers.geojson?raw=true' --output-document=/srv/odd/public/geodata/odd/hyperbaric-chambers.geojson
