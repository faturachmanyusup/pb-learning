import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Overlay from './Overlay';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import AlertFloating from 'components/Alert/Floating';
import Header from 'components/Header/Landing';
import { useRouter } from 'next/router';

const defaultNotif = {
  open: false,
  type: "",
  message: ""
}

export default function index(props) {
  const { status } = useSession()

  const router = useRouter()

  const [session, setSession] = useState('login')
  const [notif, setNotif] = useState(defaultNotif)
  const [tOut, setTOut] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (status === "loading") return

    if (status === "authenticated") {
      router.push("/class/list")
    } else {
      setLoading(false)
    }
  }, [status])

  const handleNotif = (newNotif) => {
    setNotif(defaultNotif)
    setNotif(newNotif)
    clearTimeout(tOut)

    const to = setTimeout(() => {
      setNotif(defaultNotif)

      clearTimeout(to)
    }, 10000)

    setTOut(to)
  }

  const closeAlert = () => {
    setNotif(defaultNotif)
  }

  if (loading) return <></>

  const fmtSession = session[0].toUpperCase() + session.slice(1)

  return (
    <>
      <Head>
        <title>PB-Learning - {fmtSession}</title>
        <meta property="og:title" key="login" />
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content="Masuk atau buat akun" />
        <meta name="theme-color" content="#FF4B2B"/>
      </Head>
      <Header session={session} setSession={(v) => setSession(v)} />
      <div className="body-login">
        <div className={session === 'login' ? "container" : "container-right-panel-active"} id="container">
          <SignUp setNotif={(newNotif) => handleNotif(newNotif)} />
          <SignIn setNotif={(newNotif) => handleNotif(newNotif)} />
          <Overlay setSession={(v) => setSession(v)} />
        </div>
        <AlertFloating
          open={notif.open}
          type={notif.type}
          message={notif.message}
          onClick={closeAlert}
          disappear={true}
        />
      </div>
    </>
  )
}