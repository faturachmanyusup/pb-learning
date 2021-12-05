import { useRouter } from "next/router"
import Drawer from "components/Drawer"
import { useEffect, useState } from "react"
import HeaderDashboard from "components/Header/Dashboard"

const Dashboard = (props = {
  children: <></>,
  user: {}
}) => {
  const router = useRouter()

  const { page } = router.query
  const pathname = router.pathname

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname, page])

  const openDrawer = (e) => {
    setDrawerOpen(true)
  }

  return (
    <>
      <HeaderDashboard toggleDrawer={openDrawer} user={props.user} />
      <Drawer isOpen={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <div className="max-w-screen-xl mx-auto flex flex-col mt-20 md:mt-24 mb-2 px-7">
        {props.children}
      </div>
    </>
  )
}

export default Dashboard
