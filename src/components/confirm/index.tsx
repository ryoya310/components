import * as React from 'react'
import styles from './index.module.scss'

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Button, CircularProgress } from '@mui/material';

type Props = {
  state: any
  setState: any
}
export default function Confirm(props: Props) {

  const { state, setState } = props

  const message = state.message
  const className = state.className
  const callback = state.callback

  const check = () => {
    setState((prevState: any) => ({ ...prevState, message: '' }))
    if (typeof callback === 'function') {
      callback(true)
    }
  }

  const cancel = () => {
    setState((prevState: any) => ({ ...prevState, message: '' }))
    if (typeof callback === 'function') {
      callback(false)
    }
  }
  return <>
    <div
      className={`${styles.confirm} ${className}}`}
      style={{
        display: (message == '') ? 'none' : 'table',
      }}
    >
      {
        (message != '')
          ? <>
              <div className={styles.info}>
                <div className={styles.icon}>
                  <span><HelpOutlineIcon /></span>
                </div>
                <div className={styles.message} dangerouslySetInnerHTML={{ __html: message }} />
              </div>
              <div className={styles.action}>
                <button type='button' className={styles.check} onClick={check} >OK</button>
                <button type='button' onClick={cancel} >キャンセル</button>
              </div>
            </>
          : <><CircularProgress /></>
      }
    </div>
    {
      (message)
        ? <div className={styles.overlay}></div>
        : null
    }
  </>
}