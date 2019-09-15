# Curl examples

## Generic examples

### Fetch a single node

```curl 'http://overpass-api.de/api/interpreter?data=node(1422314245);out;'```

### Fetch a single node as JSON

```curl --globoff 'http://overpass-api.de/api/interpreter?data=[out:json];node(1422314245);out;'```

### Fetch a single node as JSON using long-form POST

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
node(1422314245);
out;'
```

### Fetch a set of nodes with a particular property

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
node[sport=scuba_diving];
out;'
```

### Fetch a set of ways with a particular property

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
way[sport=scuba_diving];
out;'
```

### Fetch a set of features with a particular property

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
(
    node[sport=scuba_diving];
    way[sport=scuba_diving];
);
out;'
```

### Fetch a set of features identifying as Dive Centres

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
(
    node["amenity"="dive_centre"];
    node["amenity"="compressed_air"];
);
out;'
```

### Fetch all dive-related features

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
(
    node["sport"="scuba_diving"];
    node["shop"="scuba_diving"];
    node["amenity"="dive_centre"];
    node["amenity"="compressed_air"];
    node["healthcare"="hyperbaric_chamber"];
    way["sport"="scuba_diving"];
    way["shop"="scuba_diving"];
    way["amenity"="dive_centre"];
    way["amenity"="compressed_air"];
    way["healthcare"="hyperbaric_chamber"];
);
out;'
```

### Minimal fetch of NDAC way without child elements

```bash
curl http://overpass-api.de/api/interpreter -d '
[out:json];
(
    way["sport"="scuba_diving"](51.652271,-2.6534343,51.665369,-2.6358390);
);
out;
'
```

### Minimal fetch of NDAC way with child elements

```bash

curl http://overpass-api.de/api/interpreter -d '
[out:json];
(
    way["sport"="scuba_diving"](51.652271,-2.6534343,51.665369,-2.6358390);
    node(w);
);
out;
'

```

### Fetch all dive-related features and recurse into child elements

```bash

curl http://overpass-api.de/api/interpreter -d '
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
'

```

## Predicates

shop:      amenity=dive_centre amenity=compressed_air shop=scuba_diving
club:      club=scuba_diving
divesite:  sport=scuba_diving
