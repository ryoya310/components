import * as React from 'react'
import styles from './css/index.module.scss'

type Props = {
  value: string | number
  name: string
  type?: string
  trigger?: 'single' | 'double'
  callback?(name: string, dst: string | number): void
}
function ActiveInput(props: Props) {

  const { value, name, type = 'text', trigger = 'double', callback } = props
  const [isEditing, setIsEditing] = React.useState(false)
  const [dst, setDst] = React.useState(value)

  const handleAction = () => {
    setIsEditing(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDst(e.target.value)
  }

  const handleBlur = () => {
    setIsEditing(false)
    if (callback) {
      callback(name, dst)
    }
  }

  return <>
    {isEditing ? (
      <input
        name={name}
        type={type}
        value={dst}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        className={styles.input}
      />
    ) : (
      <div
        onClick={trigger === 'double' ? undefined : handleAction}
        onDoubleClick={trigger === 'single' ? undefined : handleAction}
        className={styles.input}
      >
        {dst}
      </div>
    )}
  </>
}
export default ActiveInput