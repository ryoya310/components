import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import Ocean from '../components/three/ocean'

const Index = () => {
  const menus = [
    {link: '/status/', name: 'ステータスバー'},
    {link: '/svg/', name: 'SVG'},
    {link: '/selecter/', name: 'セレクター'},
    {link: '/loading/', name: 'ローディング'},
    {link: '/dates/', name: '日付'},
    {link: '/confirm/', name: 'Confirm'},
  ]
  const router = useRouter()

  return <>
    <div className='back'>
      <Ocean menus={menus} />
    </div>
  </>
}
export default Index