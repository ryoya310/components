import React from 'react'
import ThreeObj from '../../components/three/threeObj'

import  styles from './index.module.scss'

function App() {

  const models = [
    {id: 1, distance: 0.3, name: 'Mouse', description: 'これマウスです。', threePath: '/components/images/mouse.glb'},
  ]
  return <div>
    <div className={styles.itemBox}>
      {
        models.map((item: any, i: number) => (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.name}>
              <span className={styles.no}>{i+1}</span>
              <span>{item.name}</span>
            </h3>
            <div className={styles.canvas}>
              <ThreeObj path={item.threePath} distance={item.distance} />
            </div>
            <div className={styles.description}>
              {item.description}
            </div>
          </div>
        ))
      }
    </div>
  </div>
}
export default App