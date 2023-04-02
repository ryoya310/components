import styles from './index.module.scss'

import P1 from './item/p1'
import P2 from './item/p2'
import P3 from './item/p3'

type Props = {
  pattern?: number
  text?: string
  isOver?: boolean
  size?: number
}

const Loading = (props: Props) => {

  const { isOver = false } = props

  const LoadingPattern = (props: Props) => {

    let Loading = P1
    if (props.pattern == 2) {
      Loading = P2
    } else if (props.pattern == 3) {
      Loading = P3
    }
    return <><Loading {...props} /></>
  }

  return <>
    {(isOver) ? <div className={styles.overlay}></div> : null}
    <div className={styles.loading}>
      <LoadingPattern {...props} />
    </div>
  </>
};
export default Loading;