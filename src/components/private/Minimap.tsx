// @ts-nocheck

import React from "react";
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api'

const Minimap = ({
  position,
  width,
  height,
}: {
  position: number[];
  width: number;
  height: number;
}) => {
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries:['places']
  })
  const center= {lat:position[0], lng:position[1]}

  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <>
      <GoogleMap center={center} zoom={15} mapContainerStyle={{width,height}}>
          <Marker position={center} />
      </GoogleMap>
    </>
  );
};

export default Minimap;
