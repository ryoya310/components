import * as React from 'react'
import Image from 'next/image'

type Props = {
  path: string
  width?: number
  height?: number
}

const QRImage = (props: Props) => {

  const { path, width = 50, height = 50} = props

  const [url, setUrl] = React.useState('')
  const [load, setLoad] = React.useState(0)

  React.useEffect(() => {

    setTimeout(() => {
      setLoad(load + 1)
    }, 10000)

    const loadQRImage = async () => {
      const res = await fetch(path)
      if (res.ok && res.status == 200) {
        const data = await res.blob()
        const url = URL.createObjectURL(data)
        setUrl(url)
      }
    }
    loadQRImage()

  }, [load])

  return (
    <>{url && (
      <Image
        src={url}
        alt={'qr'}
        width={width}
        height={height}
        layout='fixed'
        priority={true}
      />
    )}</>
  )
}

export default QRImage