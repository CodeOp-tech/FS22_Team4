import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
import "./MarkerMap.css";
// Global Leaflet variable; only necessary for the green marker.
// Everything else is provided by React Leaflet
const L = window.L;

function MarkerMap(props) {
  // By default Leaflet only comes with blue markers. We want green too!
  // https://github.com/pointhi/leaflet-color-markers
  let greenMarker = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  // let carMarker = new L.icon({
  //   iconUrl:
  //     "https://mpng.subpng.com/20180723/yxq/kisspng-computer-icons-desktop-wallpaper-clip-art-car-icon-black-5b569791f20cf8.3936918815324015539915.jpg",

  //   iconSize: [80, 80],
  //   iconAnchor: [12, 41],
  //   nameAnchor: [1, -34],
  // });

  const polyline = [
    [50.11, 8.68],
    [41.38, 2.17],
    [38.707, -9.153],
  ]


  console.log("lat", props.places.latitude)

  const lineColor = { color: 'red' }

  return (
    <MapContainer
      className="MarkerMap"
      center={props.home}
      zoom={props.zoom}
      style={{ height: "500px" }}
    >
      {/* Create the tile layer that shows the map */}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* <Polyline pathOptions={limeOptions} positions={polyline} /> */}

            {props.places.map((p) => (
              <Marker
                key={p.title}
                position={[p.latitude, p.longitude]}
                icon={greenMarker}
              >
              
              {console.log("mapLat",[[p.latitude, p.longitude]])}

              <Polyline 
                positions={[[p.latitude, p.longitude]]}
                pathOptions={lineColor}
              />

              <Popup> {breakAddr(p.title)}{" "} </Popup>

            </Marker>
            ))}

    </MapContainer>
  );
}

export default MarkerMap;
