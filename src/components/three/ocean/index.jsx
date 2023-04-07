import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Water } from 'three-stdlib'

import MeridiemSky from './sky'
import Menus from './menus'

extend({ Water })

const length = 10000

function OceanModel() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/images/water.jpeg')
  // const waterNormals = useLoader(THREE.TextureLoader, '/components/images/water.jpeg')
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

function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10
  })
  return (
    <mesh ref={ref} scale={[90, 30, 100]}>
      <boxGeometry />
      <meshStandardMaterial color='gray' />
      <Html
        distanceFactor={1.5}
        position={[0, 0, 0.51]}
        transform
        occlude
      >
        <div style={{fontSize: '36px', marginTop: '-20px', color: '#fff'}}>MenuTest</div>
      </Html>
    </mesh>
  )
}
{/* <sphereGeometry /> */}

export default function Ocean(props) {
  const cameraRef = useRef(null)
  return (
    <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>

      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />

      <Suspense fallback={null}>
        <OceanModel />
        <Box />
      </Suspense>

      <Menus menus={props.menus} length={length} />

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