import * as THREE from 'three'
import React from 'react'
import { Html } from '@react-three/drei'
import styles from './index.module.scss'

export default function Menus(props) {
  function Menu(props) {
    return (
      <group>
        <mesh position={props.position}>
          <Html center className={styles.menu}>
            <a href={props.link}>{props.name}</a>
          </Html>
        </mesh>
      </group>
    );
  }

  const y = 600
  const menus = [
    ...props.menus,
  ]

  return (
    <>
      {menus.map((menu, i) => {
        const centerIndex = (menus.length / 4)
        const angle = (Math.PI * 2 / menus.length) * (i - centerIndex)
        const x = props.length / 4 * Math.cos(angle)
        const z = props.length / 4 * Math.sin(angle)
        return (
          <Menu
            key={i}
            position={[x, y, z]}
            link={menu.link}
            name={menu.name}
          />
        )
      })}
    </>
  )
}
