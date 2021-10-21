import { useState } from 'react'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faFacebook,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import ButtonPrimary from 'components/Button/Primary'
import { POST } from 'libs/request'
import DisablePage from 'libs/disabledPage'
import { useRouter } from 'next/router'

const defaultForm = {
  email: "",
  password: ""
}

export function SignIn(props) {
  const router = useRouter()
  
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)

    POST('/api/user/login', form)
      .then(res => {
        if (res.status !== 200) throw res;

        localStorage.setItem("pbToken", res.data.pbToken)
        
        router.push("/class-list")
      })
      .catch(err => {
        props.setNotif({
          open: true,
          type: "danger",
          message: err.data.message
        })
      })
      .finally(_ => {
        setForm(defaultForm)
        setLoading(false)
      })
  }

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value

    setForm({
      ...form,
      [key]: value
    })
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLogin} id="login-form">
        <h1>Masuk</h1>
        <div className="social-container">
          <span><I icon={faFacebook} /></span>
          <span><I icon={faGoogle} /></span>
          <span><I icon={faGithub} /></span>
        </div>
        <span>atau masuk dengan email</span>
        <input
          required
          id="email-login"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          required
          id="password-login"
          type="password"
          name="password"
          placeholder="Kata Sandi"
          value={form.password}
          onChange={handleChange}
        />
        <span>Lupa Password ?</span>
        <ButtonPrimary
          id="submit-login"
          type="submit"
          loading={String(loading)}
        >
          Masuk
        </ButtonPrimary>
      </form>
    </div>
  )
}

export default DisablePage