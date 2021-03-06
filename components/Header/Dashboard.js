import Link from "next/link"
import Img from 'next/image'
import { useRouter } from 'next/router'
import ModalAdd from "components/Modal/HeaderAdd"
import { useEffect, useState } from "react"

const Header = (props = {
  user: {},
  toggleDrawer: () => { }
}) => {
  const router = useRouter()

  const { page } = router.query
  const pathname = router.pathname

  useEffect(() => {
    setModalAddOpen(false)
  }, [page, pathname])

  const [modalAddOpen, setModalAddOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-30 bg-white-500 transition-all border-b border-gray-500">
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:pt-4 lg:pb-2 mx-auto grid grid-flow-col pt-2 pb-1 sm:py-1">
        <div className="col-start-1 col-end-2 flex items-center">
          <div className="self-center mr-4">
            <Img
              src="/assets/icons/list.svg"
              width="30"
              height="30"
              className="cursor-pointer"
              onClick={props.toggleDrawer}
            />
          </div>
          <Link href="/">
            <div>
              <Img src="/assets/e-classes-logo.png" width="100" height="38" className="w-auto cursor-pointer" />
            </div>
          </Link>
        </div>
        <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:pb-1">
          <div className="self-start w-auto mr-6 mn:mr-4 mt-0.3">
            <div className="flex flex-row justify-end mb-3">
              <Img
                src="/assets/icons/plus-lg.svg"
                width="30"
                height="30"
                className={"cursor-pointer rounded-full " + (modalAddOpen ? "bg-gray-400" : " ")}
                onClick={() => setModalAddOpen(!modalAddOpen)}
              />
            </div>
            <ModalAdd open={modalAddOpen} />
          </div>
          <div className="self-center rounded-full h-8 w-8 flex items-center justify-center border-2 border-black-600 cursor-pointer sm:mb-0.3 mn:mb-0.3">
            <img
              src={props.user?.image || "/assets/icons/person-fill.svg"}
              width="27"
              height="27"
              className="rounded-full"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header