import * as THREE from 'three'
import React from 'react'
import { Sky } from '@react-three/drei'

export default function MeridiemSky() {
  const dt = new Date()
  const hours = dt.getHours()
  if (!8 <= hours && !20 >= hours) {
  // if (8 <= hours && 20 >= hours) {
    return <>
      <Sky
        scale={1000}
        sunPosition={[10, 25, 50]}
        turbidity={10}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
        luminance={1}
        inclination={0.49}
        azimuth={0.25}
        position={[50, 50, 0]}
      >
        <hemisphereLight intensity={0.5} />
      </Sky>
    </>
  } else {
    return <>
      <Sky
        scale={1000}
        sunPosition={[10, -1, 0]}
        turbidity={1}
        rayleigh={0}
        mieCoefficient={0.05}
        mieDirectionalG={0.7}
        luminance={0.1}
        inclination={0.49}
        azimuth={0.25}
      >
        <hemisphereLight intensity={0.2} />
      </Sky>
    </>
  }
}