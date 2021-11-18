import Head from "next/head"
import { getSession } from 'next-auth/react'
import ClassLayout from "components/Layout/Class"
import { GET } from "libs/request"
import config from "config/config"

const Code = (props = {
  session: {},
  class: {}
}) => {
  return (
    <>
      <Head>
        <title>Kelas - {props.class.name}</title>
        <meta property="og:title" key="create-class" />
        <meta name="description" content={`Kelas - ${props.class.name}`} />
        <meta name="theme-color" content="#FF4B2B"/>
      </Head>
      <ClassLayout class={props.class} user={props.session.user}>
        <div className="header-body h-full rounded-lg bg-forum-class bg-cover">
          <div className="flex flex-col pt-32 pl-5">
            <div className="font-bold text-3xl w-full">
              {props.class.name}
            </div>
            <div className="text-base w-full">
              oleh: {props.class.teacher.name}
            </div>
            <div className="text-base w-full">
              jadwal terdekat
            </div>
          </div>
        </div>
        <form className="w-full px-3 py-3 rounded-full border border-gray-500 mt-5 flex flex-row items-center">
          <div className="rounded-full w-10 text-center mr-2">
            <img
              src={props.session?.user?.image || "/assets/icons/person-fill.svg"}
              width="100"
              height="100"
              className="rounded-full"
            />
          </div>
          <input
            className="w-full rounded-full px-4 focus:outline-none"
            placeholder="Umumkan sesuatu"
          />
        </form>
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
