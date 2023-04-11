import * as React from 'react'
import styles from './index.module.scss'
import Loading from '../loading'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  url: string
  field?: [string, string][]
  callback?(item: any): void
}
const Picker = (props: Props) => {

  const { url, field = [['id', 'ID'], ['name', '名前']], callback } = props

  const listRef = React.useRef<HTMLDivElement>(null)

  const [request, setRequest] = React.useState({
    PageNo: 1,
    SearchWord: ''
  })
  const [list, setList] = React.useState<any[]>([])
  const [last, setLast] = React.useState(1)
  const [show, setShow] = React.useState<boolean | undefined>(undefined)
  const [scroll, setScroll] = React.useState(false)

  // 選択
  const select = (item: any) => {
    if (callback) { callback(item) }
  }

  // リスト取得
  const getList = async (url: string, request: any, type: string) => {
    const promise = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
    const response = await promise.json()
    setLast(response.heads.Pages)
    setTimeout(() => {
      if (type == 'add') {
        setList(prevList => [...prevList, ...response.bodys])
      } else if (type == 'change') {
        setList(response.bodys)
      }
      setShow(true)
      setScroll(true)
    }, 500)
  }

  // 項目変更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequest((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  // リスト絞込
  const search = () => {
    const element = listRef.current
    if (element) {
      element.scrollTop = 0
    }
    getList(url, {...request, PageNo: 1}, 'change')
  }

  React.useEffect(() => {
    // スクロール
    function handleScroll() {
      const element = listRef.current
      if (element && element.scrollHeight - element.scrollTop <= element.clientHeight) {
        console
        if (last > request.PageNo) {
          setScroll(false)
          setRequest((prevState: any) => ({...prevState, ['PageNo']: prevState.PageNo + 1}))
          getList(url, {...request, PageNo: request.PageNo + 1}, 'add')
        }
      }
    }
    const element = listRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
    setShow(false)
    getList(url, request, 'change')
  }, [scroll, show])

  return <>
    <div className={styles.picker}>
      <div className={styles.navi}>
        <input name='SearchWord' placeholder='検索キーワード' onChange={handleChange} />
        <button onClick={search}><SearchIcon /></button>
      </div>
      {
        (show === false)
          ? <Loading />
          : null
      }
      {
        list.length > 0
          ? <div className={styles.contents}>
              <div className={styles.list} ref={listRef}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width: '40px'}}></th>
                      {
                        field.map((arr: [string, string]) => (
                          <th>{arr[1]}</th>
                        ))
                      }
                      <th style={{width: 'auto'}}></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    list.map((item: any, key: number) => (
                      <tr key={key}>
                        <td>
                          <button type='button' onClick={() => select(item)}>選択</button>
                        </td>
                        {
                          field.map((arr: [string, string]) => (
                            <td>{item[arr[0]]}</td>
                          ))
                        }
                        <td style={{width: 'auto'}}></td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
              {
                (scroll)
                  ? null
                  : <div className={styles.scrollLoading}>
                      <Loading size={20} />
                    </div>
              }
            </div>
          : (show === false)
              ? null
              : <p className={styles.noitem}>No items found.</p>
      }
    </div>
  </>
}
export default Picker