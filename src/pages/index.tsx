import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Card from '../components/card'
import Counter from '../components/counter'
import Confirm from '../components/confirm'
import Loading from '../components/loading'
import Dates from '../components/dates'
import Ocean from '../components/three/ocean'

const Index = () => {

  const [state, setState] = React.useState({
    message: '',
    callback: (result: boolean) => {},
  })
  const testConfirm = () => {
    setState({
      message: 'テストですか？',
      callback: ((result: boolean) => {
        if (result) {
          console.log('OK')
        } else {
          console.log('Cancel')
        }
      })
    })
  }

  return <>
    <Confirm state={state} setState={setState} />
    <div className='cardList'>
      <Card
        title='3D背景'
        thumbnail={<>
          <Ocean />
        </>}
        description='THREEJS'
      />
      <Card
        title='Counter'
        thumbnail={<Counter name='quantity' />}
        description='Input Numberのカスタマイズ。押しっぱなしで上下する。'
      />
      <Card
        title='Confirm'
        thumbnail={<>
          <button type='button' onClick={testConfirm}>テストですか？</button>
        </>}
        description='Confirm 自作。'
      />
      <Card
        title='Loading'
        thumbnail={<>
          <Loading pattern={1} />
        </>}
        description='Loading パターン。'
      />
      <Card
        title='Dates'
        thumbnail={<>
          <Dates />
        </>}
        description='Input Date カスタマイズ。'
      />
    </div>
  </>
}
export default Index