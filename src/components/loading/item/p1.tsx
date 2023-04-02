import CircularProgress from '@mui/material/CircularProgress'
import styles from '../index.module.scss'
type Props = {
  size?: number
}
const Loading = (props: Props) => {
  const { size = 60 } = props
  return <div className={styles.pattern01}>
    <CircularProgress size={size} />
  </div>
};
export default Loading