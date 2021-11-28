import Head from "next/head"
import ClassLayout from "components/Layout/Class"
import UnderConstruction from "components/Template/UnderConstruction"
import { getSession } from "next-auth/react"
import { GET } from "libs/request"
import config from "config/config"

const Task = (props = { session: {}, class: {} }) => {
  return (
    <>
      <Head>
        <title>Kelas - {props.class.name}</title>
        <meta property="og:title" key="create-class" />
        <meta name="description" content={`Kelas - ${props.class.name}`} />
        <meta name="theme-color" content="#FF4B2B" />
      </Head>
      <ClassLayout class={props.class} user={props.session.user}>
        <UnderConstruction />
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

export default Task
