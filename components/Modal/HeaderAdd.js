const HeaderAdd = ({
  open = false,
  onJoin = () => {},
  onCreate = () => {},
}) => {
  if (!open) return <></>
  
  return (
    <div className="border border-black-500 flex flex-col items-start max-h-20 pb-1 rounded-md">
      <div className="w-full pb-2 pt-2 px-4 cursor-pointer">
        <p>
          Gabung ke kelas
        </p>
      </div>
      <div className="w-full pb-2 px-4 cursor-pointer">
        <p>
          Buat kelas
        </p>
      </div>
    </div>
  )
}

export default HeaderAdd