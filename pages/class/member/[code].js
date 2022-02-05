import Head from "next/head"
import ClassLayout from "components/Layout/Class"
import { getSession } from "next-auth/react"
import { GET } from "libs/request"
import config from "config/config"
import UserCard from "components/Card/User"

const Member = (props = { session: {}, class: {}, members: [] }) => {
  console.log(props.members)
  return (
    <>
      <Head>
        <title>Kelas - {props.class.name}</title>
        <meta property="og:title" key="create-class" />
        <meta name="description" content={`Kelas - ${props.class.name}`} />
        <meta name="theme-color" content="#FF4B2B" />
      </Head>
      <ClassLayout class={props.class} user={props.session.user}>
        <div class="flex flex-wrap gap-10">
          {props.members.map(member => 
            <UserCard
              name={member.name}
              email={member.email}
              img={member.img}
              asMentor={member.teaches.length > 0}
            />
          )}
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

    const res = await GET(config.url.base + "/api/class/member/get-all?code=" + code, {
      session: JSON.stringify(session)
    })

    if (res.status !== 200) {
      throw res
    }

    return {
      props: {
        session: session,
        class: res.data.class,
        members: res.data.members
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/${error.status}`
      }
    }
  }
}

export default Member
