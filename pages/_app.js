import 'public/styles/login.scss'
import 'public/styles/tailwind.scss'
import 'public/styles/drawer.scss'
import 'public/styles/header.scss'
import 'public/styles/datepicker.scss'
import 'react-nice-dates/build/style.css'

import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
