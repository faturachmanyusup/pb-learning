import Img from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Drawer({
  isOpen = false,
  onClick = () => { }
}) {
  const handleClick = (e) => {
    onClick()
  }

  const handleLogout = () => {
    signOut()
  }

  if (!isOpen) return <></>

  return (
    <div className="drawer-container h-screen block" onClick={handleClick}>
      <div className="drawer-content block flex flex-col justify-between px-4 py-2">
        <div>
          <Link href="/class/list">
            <span className="drawer-list rounded-md">
              <Img src="/assets/icons/home.svg" height="30" width="30" />
              <p>Semua Kelas</p>
            </span>
          </Link>
          <div className="drawer-list rounded-md">
            <Img src="/assets/icons/calendar-date.svg" height="30" width="30" />
            <p>Kalender</p>
          </div>
          <div className="drawer-list rounded-md">
            <Img src="/assets/icons/clipboard.svg" height="30" width="30" />
            <p>Tugas</p>
          </div>
        </div>
        <div className="drawer-list rounded-md" onClick={handleLogout}>
          <Img src="/assets/icons/box-arrow-right.svg" height="30" width="30" />
          <p>Keluar</p>
        </div>
      </div>
    </div>
  );
}