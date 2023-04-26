import * as React from 'react'

import styles from './index.module.scss'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

type Props = {
  name: string
  init?: number
  step?: number
  max?: number
  min?: number
  change?(no: number): void
}
export default function Counter(props: Props) {

  const { name, init = 0, step = 1, max, min, change } = props
  const [no, setNo] = React.useState(init)
  const [first, setFirst] = React.useState(true)
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null)

  const getNo = (no: number) => {
    let nextNo = no
    if (max !== undefined && max <= nextNo) { nextNo = max }
    if (min !== undefined && min >= nextNo) { nextNo = min }
    return nextNo
  }

  const changeCounter = (no: number) => {
    setNo(prevNo => getNo(no))
  }

  const changeToggle = (no: number) => {
    setNo(prevNo => getNo(prevNo + no))
  }

  const handleMouseDown = (no: number) => {
    const id = setInterval(() => {
      changeToggle(no)
    }, 150)
    setIntervalId(id)

    if (intervalId === null) {
      changeToggle(no)
    }
  }

  const handleMouseUp = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
  }

  React.useEffect(() => {
    if (change) { change(no) }
  }, [no, change])

  return <>
    <div className={styles.counters}>
      <div className={styles.prev}>
        <button
          type='button'
          onMouseDown={() => handleMouseDown(step * -1)}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown(step * -1)}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <RemoveIcon />
        </button>
      </div>
      <div className={styles.count}>
        <input
          name={name}
          type='number'
          value={no}
          max={max}
          min={min}
          onChange={(e) => changeCounter(Number(e.target.value))}
        />
      </div>
      <div className={styles.next}>
        <button
          type='button'
          onMouseDown={() => handleMouseDown(step * 1)}
          onMouseUp={handleMouseUp}
          onTouchStart={() => handleMouseDown(step * 1)}
          onTouchEnd={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <AddIcon />
        </button>
      </div>
    </div>
  </>
}