import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession, getSession } from 'next-auth/react'
import Dashboard from "components/Layout/Dashboard"
import ClassCard from "components/Card/Class"
import { GET } from "libs/request"
import config from "config/config"

const List = (props = {
  joinedClasses: [],
  createdClasses: []
}) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [status])
  
  if (loading) return <></>

  return (
    <>
      <Head>
        <title>PB-Learning - Semua Kelas</title>
        <meta property="og:title" key="create-class" />
      </Head>
      <Dashboard user={session.user}>
        <div className="max-w-screen-xl mx-auto flex flex-col mb-2">
          {props.createdClasses.length > 0 && (
            <div className="text-gray-600 body-font px-5 sm:px-0 mn:px-0 mt-24 max-w-7x1">
              <div className="flex flex-wrap w-full mb-2 py-0 px-4 sm:px-6 mn:px-6">
                <div className="w-full">
                  <h3 className="sm:text-3xl text-3xl font-medium mb-2 text-gray-900">
                    Kelas yang dibuat
                  </h3>
                  <div className="h-1 w-48 mt-3 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div className="flex flex-wrap">
                {props.createdClasses.map((_class, idx) => (
                  <div key={idx} className="md:w-1/5 p-6 sm:mx-4 mn:mx-4 mb-2">
                    <ClassCard
                      title={_class.name}
                      label={_class.teacher.name}
                      description={_class.description}
                      image={`https://picsum.photos/750/500?random=${idx}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {props.joinedClasses.length > 0 && (
            <div className="text-gray-600 body-font px-5 sm:px-0 mn:px-0 mt-20 mb-8 max-w-7x1">
              <div className="flex flex-wrap w-full mb-2 py-0 px-4 sm:px-6 mn:px-6">
                <div className="w-full">
                  <h3 className="sm:text-3xl text-3xl font-medium mb-2 text-gray-900">
                    Kelas yang diikuti
                  </h3>
                  <div className="h-1 w-48 mt-3 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div className="flex flex-wrap">
                {props.joinedClasses.map((_class, idx) => (
                  <div key={idx} className="md:w-1/5 p-6 sm:mx-4 mn:mx-4 mb-2">
                    <ClassCard
                      title={_class.name}
                      label={_class.teacher.name}
                      description={_class.description}
                      image={`https://picsum.photos/750/500?random=${idx + props.createdClasses.length}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Dashboard>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context)
    
    const res = await GET(config.url.base + "/api/class/get-all", {
      session: JSON.stringify(session)
    })

    if (res.status !== 200) throw res

    return {
      props: {
        createdClasses: res.data.createdClasses,
        joinedClasses: res.data.joinedClasses
      }
    }
  } catch (err) {
    return {
      props: {
        createdClasses: [],
        joinedClasses: []
      }
    }
  }
}

export default List
