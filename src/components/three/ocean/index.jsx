import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import MeridiemSky from '../parts/sky'
import Ocean from '../parts/ocean'
import Planet from '../parts/planet'

export default function OceanModel() {
  const cameraRef = useRef(null)
  return (
    <Canvas
      camera={{
        position: [10, 5, 400],
        fov: 55,
        near: 1,
        far: 20000,
      }}
    >
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />

      <Suspense fallback={null}>
        <Ocean />
        <Planet type='moon' />
      </Suspense>

      <MeridiemSky />

      <OrbitControls
        ref={cameraRef}
        enablePan={false}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 4}
        maxDistance={400}
        minDistance={200}
      />
    </Canvas>
  )
}