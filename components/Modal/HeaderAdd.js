import Link from 'next/link'

const HeaderAdd = ({ open = false }) => {
  if (!open) return <></>

  return (
    <div
      className="
        sm:relative md:relative lg:relative xl:relative 2xl:relative border bg-white-500 border-black-500 flex flex-col items-start
        max-h-22 rounded-md mn:absolute mn:right-3
      "
    >
      <div className="w-full py-2 px-4 cursor-pointer hover:bg-gray-400">
        <Link href="/class/create">
          Buat kelas baru
        </Link>
      </div>
      <div className="w-full py-2 px-4 cursor-pointer hover:bg-gray-400">
        <p>
          Gabung ke kelas
        </p>
      </div>
    </div>
  )
}

export default HeaderAdd