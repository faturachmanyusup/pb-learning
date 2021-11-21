import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="id">
        <Head>
          <meta name="google-site-verification" content="ukQV3uEuJQsAMgot1NKex8GlljENmVz__jczChQUmUw" />
          <meta name='application-name' content='PB-Learning' />
          <meta name='description' content='Belajar kapanpun dan di manapun dengan PB Learning' />
          <meta name='theme-color' content='#EFEFEF' />
          <link rel="preload" as="font" />
          <link rel="canonical" href="https://pb-learning.vercel.app" />
          <link rel='apple-touch-icon' href='/assets/icons/apple-touch-icon.png' />
          <link rel='manifest' href='/manifest.json' />
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