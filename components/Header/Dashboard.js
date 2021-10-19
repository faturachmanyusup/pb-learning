import Link from "next/link"
import Img from 'next/image'
import { useRouter } from 'next/router'
import ModalAdd from "components/Modal/HeaderAdd"
import { useState } from "react"

const Header = ({
  toggleDrawer = () => { }
}) => {
  const router = useRouter()

  const [modalAddOpen, setModalAddOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 w-full z-30 bg-white-500 transition-all border-b border-gray-500">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:pt-4 lg:pb-2 mx-auto grid grid-flow-col pt-2 pb-1 sm:py-1">
          <div className="col-start-1 col-end-2 flex items-center">
            <div className="self-center mr-4">
              <Img
                src="/assets/icons/list.svg"
                width="30"
                height="30"
                className="cursor-pointer"
                onClick={toggleDrawer}
              />
            </div>
            <Link href="/">
              <a>
                <Img src="/assets/e-classes-logo.png" width="100" height="38" className="w-auto cursor-pointer" />
              </a>
            </Link>
          </div>
          <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:pb-1">
            <div className="self-start w-auto mr-6 mt-0.3">
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
            <div className="self-center rounded-full h-8 w-8 flex items-center justify-center border-2 border-black-600 cursor-pointer">
              <Img src="/assets/icons/person-fill.svg" width="27" height="27" />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-4 sm:px-8 shadow-t ">
      </nav>
      {/* End Mobile Navigation */}
    </>
  );
}

export default Header