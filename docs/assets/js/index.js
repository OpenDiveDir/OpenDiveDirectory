(function($) {

    /**
     * 
     * @param feature
     *   Geojson object.
     * 
     * @return string
     *   - dive site
     *   - shop
     *   - club
     *   - hyperbaric chamber
     */
    function classifier(feature) {
        if (feature.get('healthcare') === 'hyperbaric_chamber') {
            return 'hyperbaric chamber';
        }
        else if (feature.get('club')) {
            return 'club';
        }
        else if (feature.get('shop') || feature.get('amenity') || feature.get('building')) {
            return 'shop';
        }
        else {
            return 'dive site';
        }
    }

    function geometryToPoint(geometry) {
        let centroid = ol.extent.getCenter(geometry.getExtent());
        return (new ol.geom.Point(centroid));
    }

    function getMarkerPin(feature) {
        // Default pin to empty.
        let pin = null;
        let scale = 0.015;

        switch (classifier(feature)) {
            case 'hyperbaric chamber':
                // TODO: redesign SVG
                // - add border
                // - change to pin?
                // - scale SVG to match others
                pin = '/assets/images/markers/hyperbaric_chamber.svg';
                scale = 0.1;
                break;

            case 'club':
                pin = '/assets/images/markers/pin-yellow.svg';
                break;

            case 'shop':
                pin = '/assets/images/markers/pin-red.svg';
                break;

            case 'dive site':
                pin = '/assets/images/markers/pin-blue.svg';
                break;
        }

        // Replace with question-mark if name not known; except for chambers.
        if (classifier(feature) !== 'hyperbaric chamber' && feature.get('name') === undefined) {
            pin = '/assets/images/markers/question-mark.svg';
        }
        if (feature.get('amenity') === 'compressed_air') {
            return null;
            // pin = '/assets/images/markers/scuba-cylinder.svg';
        }

        if (!pin) {
            return null;
        }

        return new ol.style.Style({
            image: new ol.style.Icon({
                src:          pin,
                scale:        scale,
                anchor:       [0.3, 0.8],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity:      0.75
            })
        });
    }

    $().ready(function() {
        // OpenLayers 5.3.0.
        var map = new ol.Map({
            target: 'map',
            layers: [

                // Static SVG image.
                // new ol.layer.Image({
                //     source: new ol.source.ImageStatic({
                //         url: '/assets/images/world.svg',
                //         // projection: projection,
                //         // imageExtent: extent,
                //         // imageLoadFunction: function (image, src) {
                //         //     image.getImage().src = src;
                //         //     image.getImage().width = ol.extent.getWidth(extent);
                //         //     image.getImage().height = ol.extent.getHeight(extent);
                //         // }
                //     })
                // }),

                // Generic world map
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),

                // Dive features.
                new ol.layer.Vector({
                    title: 'Dive sites',
                    source: new ol.source.Vector({
                        projection : 'EPSG:3857',
                        // url: '/assets/geojson/node--sport--scuba_diving.geojson',
                        url: '/assets/geojson/odd-features.geojson',
                        format: new ol.format.GeoJSON()
                    }),

                    style: function(feature, resolution) {
                        switch (feature.getGeometry().getType()) {
                            case 'Point':
                                return getMarkerPin(feature);

                            case 'Polygon':
                            case 'LineString':
                                // Provide a pin at the center of each way.
                                let pin = getMarkerPin(feature);
                                if (!pin) {
                                    return;
                                }
                                pin.setGeometry(geometryToPoint(feature.getGeometry()));

                                let color = {
                                    stroke: '#3333A3',
                                    fill:   'rgba(0,0,255,0.05)'
                                }
                                switch(classifier(feature)) {
                                    case 'club':
                                        color.stroke = '#A3A333';
                                        color.fill   = 'rgba(180,180,0,0.05)';
                                        break;

                                    case 'shop':
                                        color.stroke = '#A33333';
                                        color.fill   = 'rgba(255,0,0,0.05)';
                                        break;

                                    case 'hyperbaric chamber':
                                        color.stroke = '#33A333';
                                        color.fill   = 'rgba(0,255,0,0.05)';
                                        break;
    
                                }
                                return [
                                    new ol.style.Style({
                                        stroke: new ol.style.Stroke({
                                          color: color.stroke,
                                          width: 3
                                        })
                                      }),
                                      new ol.style.Style({
                                        fill: new ol.style.Fill({
                                          color: color.fill
                                        })
                                      }),
                                      pin
                                ];

                            default:
                                console.log(feature);
                                break;
                        }
                    }
                })
            ],

            view: new ol.View({
                // TODO: select center.
                // center: ol.proj.fromLonLat([37.41, 8.82]),
                center: ol.proj.fromLonLat([-2, 51.3]),
                zoom: 8
            })
        });

        // Hover-condition.
        map.on('pointermove', function(e) {
            map.forEachFeatureAtPixel(e.pixel, function(feature, layer) {
                var $meta = $('#meta');
                $meta.html('<span class="name col">' + feature.get('name') + '</span><span class="osm-link col"><small><a title="View on open street map." href="https://www.openstreetmap.org/' + feature.get('id') + '">' + feature.get('id') + '</a></small></span>');
            });
        });

    });
})(jQuery);
