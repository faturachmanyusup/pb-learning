import { useRouter } from "next/router"
import Drawer from "components/Drawer"
import { useEffect, useState } from "react"
import HeaderClass from "components/Header/Class"

const Class = (props = {
  children: <></>,
  user: {},
  class: {}
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
      <HeaderClass toggleDrawer={openDrawer} class={props.class} user={props.user} />
      <Drawer isOpen={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <div className="max-w-screen-xl mx-auto flex flex-col mt-24 mb-2 px-5">
        {props.children}
      </div>
    </>
  )
}

export default Class
