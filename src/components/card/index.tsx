import * as React from 'react'
import styles from './index.module.scss'

type Props = {
  title: string
  thumbnail: JSX.Element
  description: string
}
export default function Card(props: Props) {

  const { title, thumbnail, description } = props

  return <div className={styles.card}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.thumbnail}>
      {thumbnail}
    </div>
    <div className={styles.description}>
      {description}
    </div>
  </div>
}