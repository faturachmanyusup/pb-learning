import 'styles/login.scss'
import 'styles/tailwind.css'
import 'styles/drawer.scss'
import 'styles/header.scss'

import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
