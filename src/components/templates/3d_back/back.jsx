import * as React from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import { MeshReflectorMaterial } from '@react-three/drei';
import { Html } from '@react-three/drei';

const waternormals = require('./waternormals.jpg')
const moon = require('./moon.png')

import styles from './index.module.scss'

function WaterGround() {

  const texture = useTexture(waternormals.default.src);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const waterRef = React.useRef();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [time, setTime] = React.useState(0);
  const def = {
    position0: 0,
    position1: -2,
    position2: 0,
    x: 1,
    y: 1
  }
  const [pos, setPos] = React.useState({})

  useFrame(({ clock, mouse }) => {
    setTime(clock.getElapsedTime());
    if (waterRef) {
      waterRef.current.factorA = Math.sin(time * 0.7);
      waterRef.current.factorB = Math.cos(time * 0.3);
      waterRef.current.factorC = Math.sin(time * 0.2);
      waterRef.current.mouseX = mousePos.x
      waterRef.current.mouseY = mousePos.y;
      const wave1 = Math.sin(time * 0.5) * 0.3;
      const wave2 = Math.cos(time * 0.3) * 0.3;
      const wave3 = Math.sin(time * 0.2) * 0.4;
      const newPos = {
        position0: def.position0 + wave1,
        position1: def.position1 + wave2,
        position2: def.position2 + wave3,
        x: def.x,
        y: def.y
      }
      setPos(newPos);
    }
  })

  return (
    <mesh
      visible
      position={[pos.position0, pos.position1, pos.position2]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={waterRef}
    >
      <planeGeometry
        attach="geometry"
        args={[100, 12]}
        position={[pos.position0, pos.position1, pos.position2]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <MeshReflectorMaterial
        attach="material"
        color={'#048ABF'}
        metalness={0.1}
        roughness={0.2}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        envMapIntensity={1}
        normalMap={texture}
        normalScale={new THREE.Vector2(1, 1)}
      />
    </mesh>
  )
}

function Moon() {
  const moonTexture = useTexture(moon.default.src);
  const [autoRotation, setAutoRotation] = React.useState(-Math.PI / 3);
  const [mouseRotation, setMouseRotation] = React.useState(0);
  const moonMeshRef = React.useRef();
  const rotation = [0, autoRotation + mouseRotation, 0];

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    setAutoRotation(-Math.PI / 3 + elapsedTime / 8);
  });

  return (
    <>
      <mesh
        position={[3, 4, -14]}
        rotation={rotation}
        ref={moonMeshRef}
      >
        <sphereGeometry
          attach="geometry"
          args={[1.5, 32, 32]}
        />
        <meshStandardMaterial
          attach="material"
          map={moonTexture}
          metalness={0.1}
          roughness={1}
          emissive={'#777'}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  )
}

const Stars = (props) => {
  const { c } = props
  let star = [];
  for (let i = 0; i <= 20; i++) {
    const left = Math.floor(Math.random() * 1980) + "px";
    const top = Math.floor(Math.random() * 40) + "%";
    star.push(
      <div
        key={i}
        className={styles[`star${c}`]}
        style={{left: left, top: top}}
        suppressHydrationWarning={true}
      />
    );
  }
  return star;
}

export default function App() {
  return (
    <div className={styles.back}>
      <Stars c={1} />
      <Stars c={2} />
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        className={styles.canvas}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, -12]} />
        <spotLight intensity={0.8} position={[0, 10, -10]} angle={0.2} penumbra={1} />
        <WaterGround />
        <Moon />
      </Canvas>
    </div>
  )
}