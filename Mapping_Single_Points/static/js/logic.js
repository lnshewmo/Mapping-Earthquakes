// add console.log to see if the code is working
console.log('working');

// create the map object with a center and zoom level
let map = L.map('mapid').setView([34, -100], 4);

let line = [
    [37.6213, -122.3790],
    [30.18999924, -97.668663992],
    [43.6232, -79.3910],
    [40.641766, -73.780968]
];

L.polyline(line, {
    color: "blue",
    dashArray: 5,
    opacity: 0.5

}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);