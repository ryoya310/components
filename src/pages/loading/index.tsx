import * as React from 'react'
import Loading from '../../components/loading'
const LoadingPage = () => {
  return <>
    <div style={{overflow: 'hidden'}}>
      <div style={{position: 'relative', margin:'2em', height: '100px'}}>
        <Loading />
      </div>
      <div style={{position: 'relative', margin:'2em', height: '100px'}}>
        <Loading size={20} />
      </div>
      <div style={{position: 'relative', margin:'2em', height: '200px'}}>
        <Loading size={60} pattern={2}  />
      </div>
      <div style={{position: 'relative', margin:'2em', height: '200px'}}>
        <Loading size={60} pattern={3}  />
      </div>
    </div>
  </>
}
export default LoadingPage