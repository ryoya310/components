import React, { useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model(props) {
  const { nodes } = useGLTF(props.path)
  return (
    <group position={[0, 0, 0]}>
      {Object.keys(nodes).map((key) => {
        if (nodes[key].material) {
          const material = new THREE.MeshBasicMaterial({ map: nodes[key].material.map })
          return (
            <mesh
              key={key}
              geometry={nodes[key].geometry}
              material={material}
              position={[0, 0, 0]}
            />
          )
        }
        return null
      })}
    </group>
  )
}

export default function App(props) {
  const cameraRef = useRef(null)
  return (
    <Canvas
      dpr={[1, 1]}
      camera={{
        fov: 50,
        far: 10,
        position: [2, 5, 5],
        rotation: [10, 10, 0]
      }}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Model {...props} position={[0, 0, 0]} />
      <OrbitControls
        ref={cameraRef}
        enablePan={false}
        maxPolarAngle={Math.PI / 3}
        maxDistance={(props.distance) ? props.distance : 1}
      />
    </Canvas>
  )
}