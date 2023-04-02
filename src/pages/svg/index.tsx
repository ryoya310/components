import * as React from 'react'
import MySVG from '../../components/svg'
const SvgPage = () => {
  return <>
    <div style={{overflow: 'hidden'}}>
      <div style={{margin:'2em', height: '100px'}}>
        <MySVG icon='gear' animation='rotate' />
      </div>
      <div style={{margin:'2em', height: '100px'}}>
        <MySVG icon='gear' animation='beat' stroke='#ff0000'  />
      </div>
      <div style={{margin:'2em', height: '100px'}}>
        <MySVG icon='check' stroke='#4EC88C' />
      </div>
      <div style={{margin:'2em', height: '100px'}}>
        <MySVG icon='check' stroke='#ff0000' />
      </div>
    </div>
  </>
}
export default SvgPage