import Link from 'next/link'
import { useRouter } from 'next/router'
import ButtonPrimary from 'components/Button/Primary'
import { useState } from 'react'
import { POST } from 'libs/request'
import config from 'config/config'

const HeaderAdd = ({ open = false }) => {
  if (!open) return <></>

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formText, setFormText] = useState("")
  const [error, setError] = useState({ error: false })

  const toggleForm = () => {
    setFormText("")
    setError({ error: false })

    setShowForm(!showForm)
  }

  const handleJoin = (e) => {
    e.preventDefault()

    if (!formText) return

    setError({ ...error, message: "" })
    setLoading(true)

    POST(config.url.base + "/api/class/join", {
      code: formText
    })
      .then(res => {
        if (res.status !== 201) throw res

        router.push("/class/c/" + res.data.classCode)
      })
      .catch(err => {
        setError({
          error: true,
          message: err.data.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div
      className="
        sm:relative md:relative lg:relative xl:relative 2xl:relative border bg-white-500 border-black-500 flex flex-col items-start
        max-h-22 rounded-md mn:absolute mn:right-3
      "
    >
      <div className="w-full py-2 px-4 cursor-pointer hover:bg-gray-400">
        {showForm ? (
          <>
            <form onSubmit={(e) => handleJoin(e)} className="self-center w-20">
              <div className="w-28">
                <input
                  autoFocus
                  className={`px-1 ${loading ? 'w-24' : 'w-full'} border border-black-500 focus:outline-none`}
                  placeholder="kode kelas"
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                />
              </div>
            </form>
            {error.error && (
              <span className="text-warning" title={error.message}>{error.message}</span>
            )}
          </>
        ) : (
          <Link href="/class/create">
            Buat kelas baru
          </Link>
        )}
      </div>
      {showForm ? (
        <div className="w-full py-2 px-4 cursor-pointer hover:bg-gray-400">
          <div className="flex flex-row justify-between">
            <ButtonPrimary
              size="sm"
              className="mr-1"
              onClick={toggleForm}
            >
              <span className="text-xs font-medium">
                Batal
              </span>
            </ButtonPrimary>
            <ButtonPrimary
              size="sm"
              type="submit"
              color="blue"
              loading={String(loading)}
              onClick={(e) => handleJoin(e)}
            >
              <span className="text-xs font-medium">
                Masuk
              </span>
            </ButtonPrimary>
          </div>
        </div>
      ) : (
        <div onClick={toggleForm} className="w-full py-2 px-4 cursor-pointer hover:bg-gray-400">
          <p>
            Gabung ke kelas
          </p>
        </div>
      )}
    </div>
  )
}

export default HeaderAdd