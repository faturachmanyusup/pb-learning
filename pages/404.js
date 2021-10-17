import ErrorPage from 'next/error'

export default function Error() {
  return (
    <ErrorPage
      statusCode={404}
      title="Halaman tidak ditemukan"
    />
  )
}