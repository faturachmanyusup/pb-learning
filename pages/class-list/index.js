import Head from "next/head"
import { useRouter } from "next/router"
import Drawer from "components/Drawer"
import { useEffect, useState } from "react"
import HeaderDashboard from "components/Header/Dashboard"

const ClassList = () => {
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = localStorage.getItem("pbToken")

    if (!token) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [])
  
  const handleStart = () => {
    router.push('/login')
  }

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