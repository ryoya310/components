import * as React from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import styles from './index.module.scss'

const formatDate = (d: Date, pt?: number) => {
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const date = (d.getDate()).toString().padStart(2, '0')
  if (pt == 1) {
    return `${d.getFullYear()}年${month}月${date}日`
  } else {
    return `${d.getFullYear()}-${month}-${date}`
  }
}

interface Props {
  step?: number
  change?(response: any): void
}
const Weeks = (props: Props) => {

  const { step = 7, change } = props
  const [startDate, setStartDate] = React.useState(new Date())

  const getNextDate = (date: Date, days: number) => {
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + days)
    return nextDate
  }

  const changeWeek = (no: number) => {
    const nextDate = getNextDate(startDate, no * step)
    setStartDate(nextDate)
    if (change) {
      change({
        start: getNextDate(nextDate, 0),
        end: getNextDate(nextDate, step),
      })
    }
  }

  let start = ''
  let end = ''
  for (let i = 0; i <= step; i++) {
    const currentDate = getNextDate(startDate, i)
    if (i == 0) {
      start = formatDate(currentDate, 1)
    }
    if (i == step) {
      end = formatDate(currentDate, 1)
    }
  }

  return (
    <div className={styles.weeks}>
      <div className={styles.targetRange}>
        <button className={styles.prev} onClick={() => changeWeek(-1)}><ArrowBackIosNewIcon /></button>
        <div className={styles.range}>
          {(start == end) ? start : `${start} ～ ${end}`}
        </div>
        <button className={styles.next} onClick={() => changeWeek(1)}><ArrowForwardIosIcon /></button>
      </div>
    </div>
  )
}

export default Weeks