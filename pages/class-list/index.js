import Head from "next/head"
import { useRouter } from "next/router"
import { useSession } from 'next-auth/react'
import Drawer from "components/Drawer"
import { useEffect, useState } from "react"
import HeaderDashboard from "components/Header/Dashboard"

const ClassList = () => {
  const router = useRouter()
  const { status } = useSession()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    if (status === "loading") return
    
    if (status === "unauthenticated") {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [status])

  const openDrawer = (e) => {    
    setDrawerOpen(true)
  }

  if (loading) return <></>
  
  return (
    <>
      <Head>
        <title>PB-Learning - Daftar Kelas</title>
        <meta property="og:title" key="class-list" />
      </Head>
      <HeaderDashboard toggleDrawer={openDrawer} />
      <Drawer isOpen={drawerOpen} onClick={() => setDrawerOpen(false)} />
    </>
  )
}

export default ClassList