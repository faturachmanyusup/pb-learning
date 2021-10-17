import { useState } from 'react'
import Overlay from './Overlay';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import AlertFloating from 'components/Alert/Floating';

const defaultNotif = {
  open: false,
  type: "",
  message: ""
}

export default function index() {
  const [session, setSession] = useState('login')
  const [notif, setNotif] = useState(defaultNotif)
  const [tOut, setTOut] = useState(null)

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

  return (
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
      />
    </div>
  )
}