import { useState } from 'react'
import { signIn } from 'next-auth/react'
import DisablePage from 'libs/disabledPage'
import { FontAwesomeIcon as I } from '@fortawesome/react-fontawesome'
import {
  faGoogle,
  faFacebook,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import ButtonPrimary from 'components/Button/Primary'
import { POST } from 'libs/request'

const defaultForm = {
  name: "",
  email: "",
  password: ""
}

export function SignUp(props) {

  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)

  const handleRegister = (e) => {
    e.preventDefault()
    setLoading(true)

    POST('/api/user/register', form)
      .then(res => {
        if (res.status !== 201) throw res;

        return signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password
        })
      })
      .catch(err => {
        let message = err.data ? err.data.message : err.message

        props.setNotif({
          open: true,
          type: 'danger',
          message: message
        })
      })
      .finally(_ => {
        setForm(defaultForm)
        setLoading(false)
      })
  }

  const handleLoginGoogle = (e) => {
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
          type: 'danger',
          message: err.message
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleRegister} id="register-form">
        <h1>Buat Akun</h1>
        <div className="social-container">
          <span onClick={handleLoginGoogle}><I icon={faFacebook} /></span>
          <span><I icon={faGoogle} /></span>
          <span><I icon={faGithub} /></span>
        </div>
        <span>Atau daftar dengan email</span>
        <input
          required
          id="name-register"
          name="name"
          value={form.name}
          type="text"
          placeholder="Nama"
          onChange={handleChange}
        />
        <input
          required
          id="email-register"
          name="email"
          value={form.email}
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
          id="password-register"
          name="password"
          value={form.password}
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
        />
        <br />
        <ButtonPrimary
          id="submit-register"
          type="submit"
          loading={String(loading)}
        >
          Daftar
        </ButtonPrimary>
      </form>
    </div>
  )
}

export default DisablePage