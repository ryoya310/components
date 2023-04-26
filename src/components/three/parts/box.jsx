import * as THREE from 'three'
import React from 'react'

export default function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10
  })
  return (
    <mesh ref={ref} scale={[150, 12, 150]}>
      <boxGeometry />
      <meshStandardMaterial color='black' />
    </mesh>
  )
}