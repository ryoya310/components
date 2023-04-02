import * as React from 'react'

import styles from './index.module.scss'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const formatDate = (d: Date) => {
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const date = (d.getDate()).toString().padStart(2, '0')
  return `${d.getFullYear()}-${month}-${date}`
}

const setDate = (sno: number) => {
  var newDate = new Date()
      newDate.setDate(newDate.getDate() + sno)
  return formatDate(newDate)
}

type Props = {
  init?: number
  step?: number
  change?(date: string): void
}
export default function Dates(props: Props) {

  const { init = 0, step = 1, change } = props
  const [no, setNo] = React.useState(init)
  const [currentDate, setCurrentDate] = React.useState(setDate(init))

  const changeNo = (cno: number) => {
    const newNo = (no == 0) ? cno : no + cno
    setNo(newNo)
    setCurrentDate(setDate(newNo))
  }

  const changeDate = (date: string) => {
    const now = new Date()
    const nowDate = new Date(formatDate(now))
    const selectDate = new Date(date)
    var diffDate = (selectDate.getTime() - nowDate.getTime()) / (24*60*60*1000)
    setNo(diffDate)
    setCurrentDate(date)
  }

  React.useEffect(() => {
    if (change) { change(currentDate) }
  }, [currentDate, change])

  return <>
    <div className={styles.dates}>
      <div className={styles.prev}>
        <button type='button' onClick={() => changeNo(step * -1)}><ArrowBackIosNewIcon /></button>
      </div>
      <div className={styles.date}>
        <input
          type='date'
          value={currentDate}
          onChange={(e) => changeDate(e.target.value)}
        />
      </div>
      <div className={styles.next}>
        <button type='button' onClick={() => changeNo(step * 1)}><ArrowForwardIosIcon /></button>
      </div>
    </div>
  </>
}