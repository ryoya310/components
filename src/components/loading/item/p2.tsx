import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CircularProgress from '@mui/material/CircularProgress'
import styles from '../index.module.scss'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

type Props = {
  text?: string
  size?: number
}

function LoadingAnimation(props: Props) {

  const { text = 'Loading...', size = 60 } = props
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prevState => !prevState)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return <div className={styles.pattern02}>
    <CircularProgress size={size} />
    <motion.div
      className={styles.text}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {text.split('').map((letter: any, index: any) => (
        <motion.span
          key={index}
          variants={letterVariants}
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  </div>
}

export default LoadingAnimation
