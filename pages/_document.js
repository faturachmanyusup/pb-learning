import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id" a>
        <Head>
          <meta name='application-name' content='PB-Learning' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='PB-Learning' />
          <meta name='description' content='Belajar kapanpun dan di manapun dengan PB Learning' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='/icons/touch-icon-ipad.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/touch-icon-iphone-retina.png' />
          <link rel='apple-touch-icon' sizes='167x167' href='/icons/touch-icon-ipad-retina.png' />

          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://https://pb-learning.vercel.app' />
          <meta name='twitter:title' content='PB-Learning' />
          <meta name='twitter:description' content='Belajar kapanpun dan di manapun dengan PB Learning' />
          <meta name='twitter:image' content='https://https://pb-learning.vercel.app/icons/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@finkd' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='PB-Learning' />
          <meta property='og:description' content='Belajar kapanpun dan di manapun dengan PB Learning' />
          <meta property='og:site_name' content='PB-Learning' />
          <meta property='og:url' content='https://https://pb-learning.vercel.app' />
          <meta property='og:image' content='https://https://pb-learning.vercel.app/icons/apple-touch-icon.png' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument