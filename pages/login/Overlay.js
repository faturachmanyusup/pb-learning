import ButtonOutline from 'components/Button/Outline'

export default function Overlay(props) {
  return (
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Selamat Datang Kembali!</h1>
          <p>Masuk menggunakan akun yang sudah anda miliki</p>
          <ButtonOutline
            id="set-session-login"
            className="ghost"
            onClick={() => props.setSession('login')}
          >
            Masuk
          </ButtonOutline>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hallo, Teman!</h1>
          <p>Isi data diri dan mulai perjalanan bersama kami</p>
          <ButtonOutline
            id="set-session-register"
            className="ghost"
            onClick={() => props.setSession('register')}
          >
            Daftar
          </ButtonOutline>
        </div>
      </div>
    </div>
  )
}