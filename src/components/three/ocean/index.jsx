import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Water } from 'three-stdlib'

import MeridiemSky from '../parts/sky'
import Planet from '../parts/planet'

extend({ Water })

const length = 10000

function OceanModel() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  // const waterNormals = useLoader(THREE.TextureLoader, '/images/water.jpeg')
  const waterNormals = useLoader(THREE.TextureLoader, '/components/images/water.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(length, length), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x0006699,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

export default function Ocean(props) {
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
        <OceanModel />
        <Planet type='sun' position={[150, 0, 0]} />
        <Planet />
        <Planet type='moon' position={[-150, 0, 0]} />
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