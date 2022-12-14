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
};

// create the earthquake layer
let earthquakes = new L.layerGroup();

// define obj containing the overlays
let overlays = {
    Earthquakes: earthquakes
};

// create the map object with center, zoom and default layer
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom: 3,
  layers: [streets]
});

// pass our map layers to layers control and add layer control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the toronto neighborhood url
// because the dataset is large, move code after tileLayer so the map loads first
// let torontoHoods = 'https://raw.githubusercontent.com/lnshewmo/Mapping-Earthquakes/main/static/js/torontoNeighborhoods.json';

// fx to return the style parameters
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

// fx to set fill color of circleMarker based on magnitude
function getColor(magnitude) {
    if (magnitude>5){
        return '#ea2c2c';
    }
    if (magnitude>4){
        return '#ea822c';
    }
    if (magnitude>3){
        return '#ee9c00';
    }
    if (magnitude>2){
        return '#eecc00';
    }
    if (magnitude>1){
        return '#d4ee00';
    }
    return '#98ee00';
};  

// fx using magnitude to determine radius of marker
// Equakes magnitude 0 will be radius =1
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1; 
    }
    return magnitude * 4;
};
        

// grab the geoJSON data 
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(function(data) {
    console.log(data);
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // turn each feature into a circleMarker on the map
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
        },
    // We set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // create a popup to display info at each marker
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);
    // add earthquake layer
    earthquakes.addTo(map);
});


// create a legend control obj
let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    const magnitudes = [0,1,2,3,4,5];
    const colors =[
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
 }
  return div;
};

legend.addTo(map);