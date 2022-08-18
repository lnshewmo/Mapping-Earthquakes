// add console.log to see if the code is working
console.log('working');

// Create the map object with global center
// let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer that holds both tileLayers
let baseMaps = {
  Street: streets,
  Dark: dark
}

// create the map object with center, zoom and default layer
let map = L.map('mapid', {
  center: [30,30],
  zoom: 2,
  layers: [streets]
})

// pass our map layers to layers control and add layer control to the map
L.control.layers(baseMaps).addTo(map);

// add the tile layer to the map
// streets.addTo(map);

// Accessing the airport GeoJSON url
// because the dataset is large, move code after tileLayer so the map loads first
let airportData = 'https://raw.githubusercontent.com/lnshewmo/Mapping-Earthquakes/main/static/js/majorAirports.json';

// grab the geoJSON data 
d3.json(airportData).then(function(data) {
    console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data,{
    onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup('<h2>Airport code: ' + feature.properties.faa + '</h2> <hr> <h3>Airport name: ' + feature.properties.name + '</h3>');
    }
  }).addTo(map);
});




