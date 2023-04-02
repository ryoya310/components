import * as React from 'react'
import styles from './index.module.scss'

const Selecter = () => {

  const [selectNo, setSelectNo] = React.useState(0)

  const handleClick = (no: number) => {
    setSelectNo(no)
  }

  const customStyles = {
    '--width': `40px`,
    '--select': `${selectNo * 40}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.selecter} style={customStyles}>
      <div className={styles.back} />
      <ul>
        <li className={(selectNo == 0) ? styles.active : ''}>
          <button type='button' onClick={() => handleClick(0)}>1</button>
          </li>
        <li className={(selectNo == 1) ? styles.active : ''}>
          <button type='button' onClick={() => handleClick(1)}>2</button>
          </li>
        <li className={(selectNo == 2) ? styles.active : ''}>
          <button type='button' onClick={() => handleClick(2)}>3</button>
        </li>
      </ul>
    </div>
  )
}

export default Selecter
