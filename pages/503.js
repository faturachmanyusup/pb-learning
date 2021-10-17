import ErrorPage from 'next/error'

export default function Error() {
  return (
    <ErrorPage
      statusCode={503}
      title="Halaman ini masih dalam tahap pengembangan"
    />
  )
}