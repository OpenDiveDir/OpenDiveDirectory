#!/bin/sh

overpass_server="http://overpass-api.de/api/interpreter"
output_file="odd-features.geojson"

# TODO: Check that the required executables `curl` and `osmtogeojson` are available.

# Populate the POST parameters.
request_params=$(cat <<EOF
[out:json];
(
    node["sport"="scuba_diving"];
    node["shop"="scuba_diving"];
    node["amenity"="scuba_diving"];
    node["amenity"="dive_centre"];
    node["healthcare"="hyperbaric_chamber"];

    way["sport"="scuba_diving"];
    node(w);
    way["shop"="scuba_diving"];
    node(w);
    way["amenity"="scuba_diving"];
    node(w);
    way["amenity"="dive_centre"];
    node(w);
    way["healthcare"="hyperbaric_chamber"];
    node(w);
);
out;
EOF
)

# Request the data, pipe to osmtogeojson, redirect to file.
curl http://overpass-api.de/api/interpreter -d "$request_params" | osmtogeojson > $output_file
