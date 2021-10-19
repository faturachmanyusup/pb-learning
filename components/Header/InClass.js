import { useState } from 'react'
import Link from "next/link"
import Img from 'next/image'
import { useRouter } from 'next/router'

const Header = (props) => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState(null);

  return (
    <>
      <header className="fixed top-0 w-full z-30 bg-white-500 transition-all">
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Link href="/">
              <a>
                <Img src="/assets/e-classes-logo.png" width="100" height="38" className="w-auto cursor-pointer" />
              </a>
            </Link>
          </div>
          {router.pathname !== "/login" && (
            <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:pb-1">
              <Link href="/login">
                <a className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all">
                  Masuk
                </a>
              </Link>
            </div>
          )}
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