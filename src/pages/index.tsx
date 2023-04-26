import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import Ocean from '../components/three/ocean'

const Index = () => {
  const menus = [
    {link: '/components/status/', name: 'ステータスバー'},
    {link: '/components/svg/', name: 'SVG'},
    {link: '/components/selecter/', name: 'セレクター'},
    {link: '/components/loading/', name: 'ローディング'},
    {link: '/components/dates/', name: '日付'},
    {link: '/components/confirm/', name: 'Confirm'},
  ]
  const router = useRouter()

  return <>
    <div className='back'>
      <Ocean />
    </div>
  </>
}
export default Index