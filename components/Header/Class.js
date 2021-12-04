import Link from 'next/link'
import Img from 'next/image'

const Class = (props = {
  user: {},
  class: {},
  toggleDrawer: () => { }
}) => {
  const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <header className="fixed top-0 w-full z-30 bg-white-500 transition-all border-b border-gray-500">
      <nav className="max-w-screen-xl px-6 sm:px-8 lg:pt-1 lg:pb-1 mx-auto grid grid-flow-col pt-2 pb-1 sm:py-1">
        <div className="col-start-1 col-end-2 flex items-center">
          <div className="self-center mr-4">
            <Img
              src="/assets/icons/list.svg"
              width="30"
              alt="menu"
              height="30"
              className="cursor-pointer"
              onClick={props.toggleDrawer}
            />
          </div>
          <div className="self-center">
            <div className="text-base sm:mb-5 font-medium">{props.class.name}</div>
            <div className="text-xs sm:hidden mn:hidden">{props.class.teacher.name}</div>
            <div className="text-xs sm:hidden mn:hidden">
              {props.class.Schedule[0]
                ? new Date(props.class.Schedule[0].date).toLocaleDateString('id-ID', dateFormat)
                : 'Tidak ada jadwal'
              }
            </div>
          </div>
        </div>
        <div className="col-start-5 col-end-7 flex flex-row justify-between align-center self-center sm:hidden mn:hidden">
          <div className="cursor-pointer">
            <Link href={`/class/forum/${props.class.code}`}>
              Forum
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link href={`/class/task/${props.class.code}`}>
              Tugas
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link href={`/class/member/${props.class.code}`}>
              Anggota
            </Link>
          </div>
          <div className="cursor-pointer">
            <Link href={`/class/grade/${props.class.code}`}>
              Nilai
            </Link>
          </div>
        </div>
        <div className="h-11 col-start-11 col-end-11 font-medium flex justify-end items-center lg:mt-2 lg:mb-2 sm:mt-1 mn:mt-1">
          <div className="self-center rounded-full h-8 w-8 flex items-center justify-center border-2 border-black-600 cursor-pointer sm:mb-0.3 mn:mb-0.3">
            <img
              src={props.user?.image || "/assets/icons/person-fill.svg"}
              alt={props.user?.name || "profile"}
              width="27"
              height="27"
              className="rounded-full"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Class