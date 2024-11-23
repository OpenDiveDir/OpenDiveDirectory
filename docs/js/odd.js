window.addEventListener("load", (event) => {
  const map = new maplibregl.Map({
      container: 'map',
      center: [-2, 51],
      zoom: 6,
      minZoom: 0,
      maxZoom: 15,
      style: '/js/base.json'
  });
  map.addControl(new maplibregl.NavigationControl({}));
  map.addControl(new maplibregl.ScaleControl({}));
});