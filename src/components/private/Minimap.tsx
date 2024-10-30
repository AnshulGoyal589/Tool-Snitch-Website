// @ts-nocheck

import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Minimap = ({
  position,
  width,
  height,
}: {
  position: number[];
  width: number;
  height: number;
}) => {
  const icon = L.icon({ iconUrl: "/marker-icon.png" });
  return (
    <>
      <MapContainer style={{ width, height }} center={position} zoom={20}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={icon}></Marker>
      </MapContainer>
    </>
  );
};

export default Minimap;
