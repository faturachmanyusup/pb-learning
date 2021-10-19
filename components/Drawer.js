import Img from 'next/image'
import { useRouter } from 'next/router'

export default function Drawer({
  isOpen = false,
  onClick = () => {}
}) {
  const router = useRouter()
  
  const handleClick = (e) => {
    onClick()
  }
  
  const handleLogout = () => {
    localStorage.removeItem("pbToken")
    
    router.push("/")
  }

  if (!isOpen) return <></>
  
  return (
    <div className="drawer-container h-screen block" onClick={handleClick}>
      <div className="drawer-content block flex flex-col justify-between px-4 py-2">
        <div>
          <div id="1" className="drawer-list">
            <Img src="/assets/icons/home.svg" height="30" width="30" />
            <p>Halaman Depan</p>
          </div>
          <div id="2" className="drawer-list">
            <Img src="/assets/icons/calendar-date.svg" height="30" width="30" />
            <p>Kalender</p>
          </div>
          <div id="3" className="drawer-list">
            <Img src="/assets/icons/clipboard.svg" height="30" width="30" />
            <p>Tugas</p>
          </div>
        </div>
          <div id="3" className="drawer-list" onClick={handleLogout}>
            <Img src="/assets/icons/box-arrow-right.svg" height="30" width="30" />
            <p>Keluar</p>
          </div>
      </div>
    </div>
  );
}