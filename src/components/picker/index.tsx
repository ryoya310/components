import * as React from 'react'
import styles from './index.module.scss'
import SearchIcon from '@mui/icons-material/Search'

interface Item {
  id: number;
  name: string;
}
type Props = {
  initList: Item[]
  callback?(item: Item): void
}
const Picker = (props: Props) => {

  const { initList, callback } = props

  // リスト宣言
  const [list, setList] = React.useState<Item[]>(initList)

  // リスト絞込
  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    const filteredList = initList.filter((item: Item) => item.name.toLowerCase().includes(searchTerm))
    setList(filteredList)
  }

  // 選択
  const select = (item: Item) => {
    if (callback) { callback(item) }
  }

  return <>
    <div className={styles.picker}>
      <div className={styles.navi}>
        <SearchIcon />
        <input name='search' placeholder='絞込ワード' onChange={search} />
      </div>
      {
        list.length > 0
          ? <ul className={styles.list}>
              {
                list.map((item: Item) => (
                  <li key={item.id}>
                    <button type='button' onClick={() => select(item)}>選択</button>
                    <span>{item.name}</span>
                  </li>
                ))
              }
            </ul>
          : <p className={styles.noitem}>No items found.</p>
      }
    </div>
  </>
}
export default Picker