import Head from 'next/head'

export default function Offline() {
  return (
    <>
      <Head>
        <title>PB-Learning - Offline</title>
      </Head>
      <div className="min-h-5">
        <h2 className="mx-auto my-auto">You're offline</h2>
      </div>
    </>
  )
}