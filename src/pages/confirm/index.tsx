import * as React from 'react'
import Confirm from '../../components/confirm'

const DatesPage = () => {

  const [state, setState] = React.useState({
    message: '',
    callback: (result: boolean) => {},
  })

  const test1 = () => {
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

  const test2 = () => {
    setState({
      message: '削除しますか？',
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
    <div style={{overflow: 'hidden'}}>
      <div style={{margin:'2em', height: '100px'}}>
        <button type='button' onClick={test1}>テストですか？</button>
      </div>
      <div style={{margin:'2em', height: '100px'}}>
        <button type='button' onClick={test2}>削除しますか？</button>
      </div>
    </div>
  </>
}
export default DatesPage