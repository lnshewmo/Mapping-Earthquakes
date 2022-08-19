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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create base layer that holds both tileLayers
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets
}

// create the map object with center, zoom and default layer
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom: 3,
  layers: [streets]
})

// pass our map layers to layers control and add layer control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing the toronto neighborhood url
// because the dataset is large, move code after tileLayer so the map loads first
// let torontoHoods = 'https://raw.githubusercontent.com/lnshewmo/Mapping-Earthquakes/main/static/js/torontoNeighborhoods.json';

// store line style
//let myStyle = {
//     color: 'aqua',
//     weight: 1,
//     fillColor: 'lightpink'
// }

// grab the geoJSON data 
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);
});
