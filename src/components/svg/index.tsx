import React from 'react';
import styles from './index.module.scss'

type Props = {
  fill?: string
  stroke?: string
  size?: number
  icon: 'gear' | 'check'
  animation?: 'rotate' | 'beat'
}
const MySVG = (props: Props) => {

  const { fill = 'none', stroke = 'none', size = 45, icon, animation = '' } = props

  const Icon = () => {
    if (icon == 'gear') {
      return  <svg
                xmlns='http://www.w3.org/2000/svg'
                fill={fill}
                stroke={stroke}
                className={`${styles[animation]}`}
                viewBox='0 0 24 24'
                style={{
                  width: `${size}px`,
                  height: `${size}px`
                }}
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'/>
                <path d='M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z' />
                <circle cx='12' cy='12' r='3' />
              </svg>
    } else if (icon == 'check') {
      return    <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill={fill}
                  stroke={stroke}
                  className={`${styles[animation]}`}
                  viewBox='0 0 24 24'
                  style={{
                    width: `${size}px`,
                    height: `${size}px`
                  }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
    }
  }
  return <div className={styles.wrapper}>{Icon()}</div>
}

export default MySVG