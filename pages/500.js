import ErrorPage from 'next/error'

export default function Error() {
  return (
    <ErrorPage
      statusCode={500}
      title="Server sedang sibuk. Silahkan Coba lagi beberapa saat."
    />
  )
}