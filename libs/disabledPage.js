import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function DisablePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/404')
  }, [])

  return <div></div>
}