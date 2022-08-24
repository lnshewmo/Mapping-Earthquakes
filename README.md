# Mapping-Earthquakes
### Using Javascript, D3, Mapbox and Leaflet to create an interactive map of US Geological Survey (USGS) GeoJSON earthquake data

## Overview

GeoJSON data is pulled from the USGS earthquake [website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and populated onto a Mapbox-generated base map using JavaScript and the D3 library.  An API request to Mapbox obtains the base map and satellite layers, and Leaflet methods are used to create the interactive layers, overlays and popups.  The popup markers can be clicked to obtain location and magnitude information, and are also colored (refer to the legend) and sized to reflect earthquake magnitude.  By toggling layers and overlays, multiple visualizations are possible.  The map is rendered on a local server.

#### Map Layers: Street, Satellite, Ocean

#### Overlays: All Earthquakes, Tectonic Plates, Major Earthquakes (only)

This map is showing a street view with tectonic plates and all earthquakes.
![map](/Earthquake_Challenge/static/map.png)

This map is showing the ocean terrain and location of only the major earthquakes (>4.5 magnitude).
![map](/Earthquake_Challenge/static/ocean_overlay.png)


To render the data visualization, a valid API token for Mapbox is required.  The files are located in the Earthquake_Challenge folder.
