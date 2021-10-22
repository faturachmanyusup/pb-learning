import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faFacebook,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import ButtonPrimary from 'components/Button/Primary'
import DisablePage from 'libs/disabledPage'

const defaultForm = {
  email: "",
  password: ""
}

export function SignIn(props) {
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password
    })
      .then(res => {
        if (res.error) throw res.error
      })
      .catch(err => {
        props.setNotif({
          open: true,
          type: "danger",
          message: err
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

  const loginGoogle = () => {
    signIn("google", { redirect: false })
  }

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLogin} id="login-form">
        <h1>Masuk</h1>
        <div className="social-container">
          <span><I icon={faFacebook} /></span>
          <span onClick={loginGoogle}><I icon={faGoogle} /></span>
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