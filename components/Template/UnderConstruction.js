import { useEffect, useState } from "react"
import Img from 'next/image'

export default function UnderConstruction() {
  const [text, setText] = useState('Under construction ')

  useEffect(() => {
    setTimeout(() => {
      if (text.length === 22) {
        setText(text.slice(0, -3))

        return
      }

      setText(text + '.')
    }, 1000)
  }, [text])

  return (
    <div className="mx-auto w-full">
      <div className="mx-auto pl-9 w-48 flex flex-col justify-center">
        <Img
          src="/assets/under-construction.gif"
          width="100"
          height="100"
        />
        <div className="font-normal mt-5 -ml-2">
          {text}
        </div>
      </div>
    </div>
  )
}