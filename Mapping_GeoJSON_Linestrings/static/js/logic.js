// add console.log to see if the code is working
console.log('working');

// Create the map object with global center
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer that holds both tileLayers
let baseMaps = {
  Day_Navigation: light,
  Night_Navitation: dark
}

// create the map object with center, zoom and default layer
let map = L.map('mapid', {
  center: [44.0,-80.0],
  zoom: 2,
  layers: [dark]
})

// pass our map layers to layers control and add layer control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the toronto data url
// because the dataset is large, move code after tileLayer so the map loads first
let torontoData = 'https://raw.githubusercontent.com/lnshewmo/Mapping-Earthquakes/main/static/js/torontoRoutes.json';

// grab the geoJSON data 
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    color: 'lightyellow',
    lineweight: 1,
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup('<h2>Airline: ' + feature.properties.airline + '</h2> <hr> <h3>Destination: ' + feature.properties.dst+ '</h3>');
    }
  }).addTo(map);
});
