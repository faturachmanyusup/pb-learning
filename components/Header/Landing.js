import Link from "next/link"
import Img from 'next/image'
import { useRouter } from 'next/router'

const Header = ({
  session = "",
  setSession = () => { }
}) => {
  const router = useRouter()

  return (
    <header className="fixed top-0 w-full z-30 bg-white-500 transition-all border-b border-gray-500">
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:pt-4 lg:pb-2 mx-auto grid grid-flow-col pt-2 pb-1 sm:py-1">
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
        {(router.pathname === "/login" && (
          session === "login" ? (
            <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:pb-1 lg:hidden md:hidden">
              <a
                className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all"
                onClick={() => setSession("register")}
              >
                Daftar
              </a>
            </div>
          )
            : (
              <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:pb-1 lg:hidden md:hidden">
                <a
                  className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-orange-500 transition-all"
                  onClick={() => setSession("login")}
                >
                  Masuk
                </a>
              </div>
            )
        ))}
      </nav>
    </header>
  );
}

export default Header