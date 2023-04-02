import * as React from 'react'
import Status from '../../components/status'

type ListItem = {
  id: number
  name: string
}
const StatusPage = () => {

  const list: ListItem[] = [
    {id: 1, name: '見積'},
    {id: 2, name: '注文'},
    {id: 3, name: '請求'},
    {id: 4, name: '納品'},
    {id: 5, name: '領収'},
    {id: 7, name: '完了'},
  ]

  const [current, setCurrent] = React.useState({
    id: 1,
    name: '見積中'
  })

  const updateStatus = (arr: ListItem) => {
    console.log(arr)
    setCurrent(arr)
  }

  return <>
    <div style={{margin:'1em'}}>
      現在のステータス : {current.name}
    </div>
    <div style={{margin:'1em'}}>
      <Status list={list} current={current.id} callback={updateStatus} />
    </div>
  </>
}
export default StatusPage