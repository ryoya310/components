import * as React from 'react'
import styles from './index.module.scss'
import Loading from '../loading'
import SearchIcon from '@mui/icons-material/Search'

/**
 * 0 -> field
 * 1 -> type
 * 2 -> default
 * 3 -> input type
 * 4 -> placeholder
 * 5 -> select | option | radio | checkbox
 */
type RequestItem = [
  string,
  number | string,
  string?,
  string?,
  {
    id: number,
    caption: string
  }[]?
]
type Props = {
  url: string
  field?: [string, string][]
  beforeRequest?: RequestItem[]
  afterRequest?: RequestItem[]
  callback?(item: any): void
}
const Picker = (props: Props) => {

  const { url, field = [['id', 'ID'], ['name', '名前']], beforeRequest = [], afterRequest = [], callback } = props

  const listRef = React.useRef<HTMLDivElement>(null)

  const initRequest: RequestItem[] = [
    ['PageNo', 1],
    ['SearchWord', '', 'text', '検索ワード'],
  ]

  const requests = [...beforeRequest, ...initRequest, ...afterRequest]

  type RequestProps = {
    [key: string]: number | string
  }
  const [request, setRequest] = React.useState<RequestProps>(() => {
    const state: RequestProps = {}
    requests.forEach(([field, defaultValue]) => {
      state[field] = defaultValue
    })
    return state
  })

  const [list, setList] = React.useState<any[]>([])
  const [last, setLast] = React.useState(1)
  const [show, setShow] = React.useState<boolean | undefined>(undefined)

  // 選択
  const select = (item: any) => {
    if (callback) { callback(item) }
  }

  // リスト取得
  const getList = async (url: string, request: RequestProps, type: string) => {
    if (show !== undefined) {
      setShow(false)
    }
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
    }, 500)
  }

  // 項目変更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setRequest(prevState => ({ ...prevState, [name]: value }))
  }

  const html = requests.map(([name, defaultValue, inputType, placeholder, options]) => {
    if (!inputType) return
    switch (inputType) {
      case 'select':
        if (Array.isArray(options)) {
          return (
            <select name={name} defaultValue={defaultValue} onChange={handleChange}>
              <option value={''}>{placeholder}</option>
              {options.map((option: { id: number, caption: string }) => (
                <option key={option.id} value={option.id}>{option.caption}</option>
              ))}
            </select>
          )
        }
        break
      case 'radio':
        if (Array.isArray(options)) {
          return (
            <div>
              {options.map((option: { id: number, caption: string }) => (
                <label key={option.id}>
                  <input type='radio' name={name} value={option.id} onChange={handleChange} /> {option.caption}
                </label>
              ))}
            </div>
          )
        }
        break
      case 'checkbox':
        if (Array.isArray(options)) {
          return (
            <div>
              {options.map((option: { id: number, caption: string }) => (
                <label key={option.id}>
                  <input type='checkbox' name={name} value={option.id} onChange={handleChange} /> {option.caption}
                </label>
              ))}
            </div>
          )
        }
        break
      default:
        return (
          <input type={inputType ?? 'text'} name={name} defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange} />
        )
    }
  })

  // リスト絞込
  const search = () => {
    const element = listRef.current
    if (element) {
      element.scrollTop = 0
    }
    setRequest((prevState: RequestProps) => ({...prevState, ['PageNo']: 1}))
    getList(url, {...request, PageNo: 1}, 'change')
  }

  React.useEffect(() => {
    // スクロール
    function handleScroll() {
      const element = listRef.current
      if (element && element.scrollHeight - element.scrollTop <= element.clientHeight) {
        if (+last > +request.PageNo) {
          setRequest((prevState: RequestProps) => ({...prevState, ['PageNo']: +prevState.PageNo + 1}))
          getList(url, {...request, PageNo: +request.PageNo + 1}, 'add')
        }
      }
    }
    const element = listRef.current
    if (show === undefined) {
      getList(url, request, 'change')
    }
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return <>
    <div className={styles.picker}>
      <div className={styles.navi}>
        <div>
          {html}
        </div>
        <div>
          <button onClick={search}><SearchIcon /></button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.list} ref={listRef}>
          <table>
            <thead>
              <tr>
                <th style={{width: '40px'}}></th>
                {
                  field.map((arr: [string, string]) => (
                    <th key={arr[0]}>{arr[1]}</th>
                  ))
                }
                <th style={{width: '100%'}}></th>
              </tr>
            </thead>
            <tbody>
            {
              list.length > 0 && list.map((item: any, key: number) => (
                <tr key={key}>
                  <td>
                    <button type='button' onClick={() => select(item)}>選択</button>
                  </td>
                  {
                    field.map((arr: [string, string]) => (
                      <td key={arr[0]}>{item[arr[0]]}</td>
                    ))
                  }
                  <td style={{width: '100%'}}></td>
                </tr>
              ))
            }
            </tbody>
          </table>
          {
            (list.length < 1 && show)
              ? <p className={styles.noitem}>No items found.</p>
              : null
          }
        </div>
        {
          (show)
            ? null
            : <div className={styles.scrollLoading}>
                <Loading size={20} />
              </div>
        }
      </div>
    </div>
  </>
}
export default Picker