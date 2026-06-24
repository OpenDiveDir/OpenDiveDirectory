import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Style from '../maplibre/style/base.json';

window.addEventListener("load", (event) => {

  const map = new maplibregl.Map({
      container: 'map',
      center: [-2, 51],
      zoom: 6,
      minZoom: 2,
      maxZoom: 17,
      style: Style,
      attributionControl: false
  });

  map.addControl(new maplibregl.NavigationControl({}));
  map.addControl(new maplibregl.ScaleControl({}));
  map.addControl(new maplibregl.AttributionControl({
    compact: true
  }));
});
