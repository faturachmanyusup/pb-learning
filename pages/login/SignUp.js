import { useEffect, useState } from 'react'
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
        
        props.setNotif({
          open: true,
          type: "success",
          message: res.data.message
        })
      })
      .catch(err => {
        props.setNotif({
          open: true,
          type: 'danger',
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleRegister}>
        <h1>Buat Akun</h1>
        <div className="social-container">
          <span><I icon={faFacebook} /></span>
          <span><I icon={faGoogle} /></span>
          <span><I icon={faGithub} /></span>
        </div>
        <span>Atau daftar dengan email</span>
        <input
          required
          name="name"
          value={form.name}
          type="text"
          placeholder="Nama"
          onChange={handleChange}
        />
        <input
          required
          name="email"
          value={form.email}
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          value={form.password}
          type="password"
          placeholder="Kata Sandi"
          onChange={handleChange}
        />
        <br />
        <ButtonPrimary
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