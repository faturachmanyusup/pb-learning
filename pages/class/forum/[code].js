import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import { getSession } from 'next-auth/react'
import ClassLayout from "components/Layout/Class"
import { GET, POST } from "libs/request"
import config from "config/config"
import Message from "components/Card/Message"
import FormMessage from "components/Form/Message"

const Code = (props = { session: {}, class: {} }) => {
  const limit = 5;
  const observerRef = useRef()
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState({
    text: '',
    files: []
  })
  const [isBottom, setIsBottom] = useState(false)

  let observer

  useEffect(() => {    
    observer = new IntersectionObserver(observerCallback, {
      threshold: 1
    })

    if (!observerRef.current || isBottom) return

    observer.observe(observerRef.current)
  }, [messages.length])

  const sendChat = (e) => {
    e.preventDefault()
    if (!form.text && !form.files.length) return

    POST('/api/class/forum/create', {
      classId: props.class.id,
      form: form,
      limit: messages.length
    }, {
      session: JSON.stringify(props.session)
    })
      .then(res => {
        setMessages(res.data.updated)
      })
      .catch()
  }

  const populateChat = () => {
    GET(
      '/api/class/forum/get?classId=' + props.class.id + '&skip=' + messages.length + '&limit=' + limit,
      {
        session: JSON.stringify(props.session)
      }
    )
      .then(res => {
        if (res.data.messages.length < 5) {
          setIsBottom(true)
        }

        setMessages([...messages, ...res.data.messages])

        observer.unobserve(observerRef.current)
      })
  }

  const setFormText = (text) => {
    setForm({
      ...form,
      text: text
    })
  }

  const observerCallback = ([entry]) => {
    if (!entry.isIntersecting) {
      return
    }

    populateChat()

    return
  }

  return (
    <>
      <Head>
        <title>Kelas - {props.class.name}</title>
        <meta property="og:title" key="create-class" />
        <meta name="description" content={`Kelas - ${props.class.name}`} />
        <meta name="theme-color" content="#FF4B2B" />
      </Head>
      <ClassLayout class={props.class} user={props.session.user}>
        <div className="md:h-52 header-body rounded-lg bg-forum-class bg-cover">
          <div className="flex flex-col my-2 mx-4 md:mt-20 md:ml-6">
            <div className="font-bold my-3 text-3xl w-full">
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
        <FormMessage send={sendChat} session={props.session} updateText={(text) => setFormText(text)} />
        {messages.map((message) => (
          <Message
            key={message._id}
            img={message.userImg}
            alt={message.username}
            text={message.text}
          />
        ))}
        <div ref={observerRef}></div>
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
