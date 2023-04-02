import * as React from 'react'
import styles from './index.module.scss'

type ListItem = {
  id: number
  name: string
}

type Props = {
  list: ListItem[]
  current?: number
  color?: string
  hoverColor?: string
  callback?(arr: ListItem): void
}
const Status = (props: Props) => {

  const { list, current = 1, color = '#4EC88C', hoverColor = '#4EC88C80', callback } = props

  const handleClick = (arr: ListItem) => {
    if (callback) {
      callback(arr)
    }
  }

  return <>
    <ul className={styles.status}>
    {
      list.map((arr: ListItem, key: number) => {
        return (
          <li
            key={key}
            style={
              {
                '--zIndex': `${list.length - key}`,
                '--width': `calc(100% / ${list.length})`,
                '--bkcolor': (arr.id > current) ? '#eeeeee' : color,
                '--hoverColor': hoverColor,
                '--color': (arr.id > current) ? '#666666' : '#ffffff',
              } as React.CSSProperties
            }
            onClick={() => handleClick(arr)}
          >
            <button type='button'>
              {arr.name}
            </button>
          </li>
        )
      })
    }
    </ul>
  </>
}
export default Status