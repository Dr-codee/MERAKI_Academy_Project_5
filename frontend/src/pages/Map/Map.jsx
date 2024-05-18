"use client";
import React from 'react'
// import { useState } from 'react'
import { APIProvider} from "@react-google-maps/api"
export default function Map() {
const position = {lat:53.53,lng:10}

  return (
    <APIProvider>
    <div style={{height:"100vh",width:"50%"}}>
        <Map zoom={9} center={position}></Map>
    </div>
  </APIProvider>
  )
}
