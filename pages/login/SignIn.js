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

    POST('/api/user/login', form)
      .then(res => {
        if (res.status !== 200) throw res;

        props.setNotif({
          open: true,
          type: "success",
          message: res.data.message
        })
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
      <form onSubmit={handleLogin}>
        <h1>Masuk</h1>
        <div className="social-container">
          <span><I icon={faFacebook} /></span>
          <span><I icon={faGoogle} /></span>
          <span><I icon={faGithub} /></span>
        </div>
        <span>atau masuk dengan email</span>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="Kata Sandi"
          value={form.password}
          onChange={handleChange}
        />
        <span>Lupa Password ?</span>
        <ButtonPrimary
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