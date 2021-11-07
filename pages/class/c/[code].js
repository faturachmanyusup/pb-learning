import { useEffect, useState } from "react"
import Head from "next/head"
import { getSession } from 'next-auth/react'
import Img from 'next/image'
import ClassLayout from "components/Layout/Class"
import { GET } from "libs/request"
import config from "config/config"

const temp = 'Under construction '

const Code = (props = {
  session: {},
  class: {}
}) => {
  const [tempText, setTempText] = useState(temp)

  useEffect(() => {
    setTimeout(() => {
      if (tempText.length === 22) {
        setTempText(temp)

        return
      }

      setTempText(tempText + '.')
    }, 1000)
  }, [tempText])

  return (
    <>
      <Head>
        <title>Kelas - {props.class.name}</title>
        <meta property="og:title" key="create-class" />
      </Head>
      <ClassLayout class={props.class} user={props.session.user}>
        <div className="mx-auto w-full">
          <div className="mx-auto pl-9 w-48 flex flex-col justify-center">
            <Img
              src="/assets/under-construction.gif"
              width="100"
              height="100"
            />
            <div className="font-normal mt-5 -ml-2">
              {tempText}
            </div>
          </div>
        </div>
      </ClassLayout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  try {
    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }

    const { code } = ctx.params

    const res = await GET(config.url.base + "/api/class/get?code=" + code, {
      session: JSON.stringify(session)
    })

    if (res.status !== 200) {
      throw res
    }

    return {
      props: {
        session: session,
        class: res.data.class
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      }
    }
  }
}

export default Code
