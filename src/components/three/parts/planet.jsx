import * as THREE from 'three'
import React from 'react'
import { useLoader, useFrame } from '@react-three/fiber'

export default function Earth(props) {

  const { size = 80, scale, position, type } = props
  const ref = React.useRef();
  // const root  = '/images/'
  const root  = '/components/images/'
  let image = 'earth.png'
  if (type == 'sun') {
    image = 'sun.jpg'
  } else if (type == 'moon') {
    image = 'moon.jpg'
  }
  const texture = useLoader(THREE.TextureLoader, root + image)

  let setScale = (scale) ? scale : [size-30, size-30, size-30]
  let setPosition = (position) ? position : [0, 0, 0]
  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5;
    ref.current.position.y = size;
  });
  return (
    <mesh ref={ref} scale={setScale} position={setPosition}>
      <sphereGeometry />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}