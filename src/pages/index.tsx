import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useRouter } from 'next/router'
const Index = () => {
  const menus = [
    {link: 'status', name: 'ステータスバー'}
  ]
  const router = useRouter()

  return <>
    <div className='index'>
      <h1>コンポーネントテスト</h1>
      <div className='contents'>
        <ul className='menu'>
          <li onClick={() => router.push('/status/')}>
            <h2>ステータスバー</h2>
          </li>
          <li onClick={() => router.push('/svg/')}>
            <h2>SVG</h2>
          </li>
          <li onClick={() => router.push('/selecter/')}>
            <h2>セレクター</h2>
          </li>
          <li onClick={() => router.push('/loading/')}>
            <h2>ローディング</h2>
          </li>
          <li onClick={() => router.push('/dates/')}>
            <h2>日付</h2>
          </li>
          <li onClick={() => router.push('/confirm/')}>
            <h2>Confirm</h2>
          </li>
        </ul>
      </div>
    </div>
  </>
}
export default Index