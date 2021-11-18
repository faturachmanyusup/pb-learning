import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from 'next-auth/react'
import { id } from 'date-fns/locale'
import Dashboard from "components/Layout/Dashboard"
import ButtonPrimary from 'components/Button/Primary'
import { Datepicker, Timepicker } from 'components/Form'
import Accordion from 'components/Accordion'
import Alert from 'components/Alert/Floating'
import FormatDate from 'helpers/formatDate'
import { POST } from 'libs/request'

const CreateClass = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [loading, setLoading] = useState(true)
  const [classInfo, setClassInfo] = useState({
    name: "",
    description: ""
  })
  const [schedules, setSchedules] = useState([]);
  const [activeDatePick, setActiveDatePick] = useState(new Date())
  const [activeTimePick, setActiveTimePick] = useState("")
  const [activeNotes, setActiveNotes] = useState("")
  const [showSchedules, setShowSchedules] = useState([])
  const [accordionAddSchedule, setAccordionAddSchedule] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: ""
  })

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [status])

  const handleAddSchedule = () => {
    const newSchedule = {
      date: activeDatePick,
      time: activeTimePick,
      notes: activeNotes
    }

    setSchedules([...schedules, newSchedule])
    setActiveNotes("")
  }

  const handleClassInfo = ({ target }) => {
    setClassInfo({
      ...classInfo,
      [target.name]: target.value
    })
  }

  const handleShowSchedules = (id) => {
    const isShow = showSchedules.findIndex(idx => idx === id) > -1

    if (isShow) {
      setShowSchedules(showSchedules.filter(idx => idx !== id))
      return
    }

    setShowSchedules([...showSchedules, id])
  }

  const handleEditSchedule = (target = {}, idx) => {
    const { name, value } = target
    let temp = [...schedules]

    temp[idx][name] = value

    setSchedules(temp)
  }

  const goBack = () => {
    router.back();
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    POST("/api/class/create", {
      newClass: classInfo,
      schedules: schedules
    }, {
      session: JSON.stringify(session)
    })
      .then(res => {
        if (res.status !== 201) throw {
          message: "Kesalahan saat membuat kelas"
        }

        setClassInfo({ name: "", description: "" })
        setSchedules([])
        setActiveDatePick(new Date())
        setActiveTimePick("")
        setActiveNotes("")
        setSchedules([])
        setAccordionAddSchedule(false)
        setAlert({
          open: true,
          message: (
            <div className="flex flex-col">
              <span>{res.data.message}</span>
              <span>
                Kode kelas: <strong>{res.data.classCode}</strong>
              </span>
            </div>
          )
        })
      })
      .catch(err => {
        setAlert({
          open: true,
          type: 'danger',
          message: err.message
        })

      })
  }
  
  if (loading) return <></>

  return (
    <>
      <Head>
        <title>PB-Learning - Buat Kelas Baru</title>
        <meta property="og:title" key="create-class" />
        <meta name="description" content="Buat kelas baru" />
        <meta name="theme-color" content="#FF4B2B"/>
      </Head>
      <Dashboard user={session.user}>
        <div className="flex lg:-mt-20 flex-col items-center mb-2 lg:w-4/6 lg:mx-auto">
          <div className="md:sticky md:top-4 md:z-30">
            <span className="text-2xl font-bold">Buat Kelas</span>
          </div>
          <form
            className="md:w-8/12 md:mt-20 mt-10 px-10 xl:px-16 mx-auto bg-white shadow-2xl rounded px-8 py-6 mb-4 flex flex-col"
            onSubmit={handleSubmit}
          >
            <div className="text-lg font-semibold mb-3 -ml-5 sm:-ml-3 mn:-ml-3">Info Kelas</div>
            <div className="-mx-3 md:flex mn:mb-2">
              <div className="w-full px-3">
                <label className="block tracking-wide text-sm font-md mb-2">
                  Nama Kelas
                </label>
                <input
                  required
                  name="name"
                  className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-red rounded py-3 px-4 mb-3"
                  type="text"
                  placeholder="Pengantar Algoritma"
                  value={classInfo.name}
                  onChange={handleClassInfo}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-10">
              <div className="md:w-full px-3">
                <label className="block tracking-wide text-sm font-md mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4 mb-3"
                  placeholder="Ceritakan tentang kelas anda di sini"
                  value={classInfo.description}
                  onChange={handleClassInfo}
                />
              </div>
            </div>
            <div className="text-lg font-semibold mb-4 -ml-5 sm:-ml-3 mn:-ml-3">Jadwal Kelas</div>
            {schedules.map((schedule, idx) => {
              const expand = showSchedules.findIndex(show => show === idx) > -1

              return (
                <Accordion
                  key={`schedule-${idx + 1}`}
                  expand={expand}
                  label={`Jadwal ke - ${idx + 1}`}
                  onClick={() => handleShowSchedules(idx)}
                >
                  <div className="flex flex-col mb-4">
                    <div className="-mx-3 md:flex mb-4 mt-2 mn:mb-2">
                      <div className="md:w-1/2 px-3 mn:mb-4">
                        <Datepicker
                          name="date"
                          locale={id}
                          minimumDate={schedule[idx - 1] ? schedule[idx - 1].date : new Date()}
                          date={activeDatePick}
                          onDateChange={(target) => handleEditSchedule(target, idx)}
                          label="Tanggal"
                          text={FormatDate.toString(schedule.date)}
                        />
                      </div>
                      <div className="md:w-1/2 px-3 mn:mb-2">
                        <Timepicker
                          name="time"
                          label="Jam"
                          className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4"
                          onChange={(e) => handleEditSchedule(e.target, idx)}
                          value={schedule.time}
                        />
                      </div>
                    </div>
                    <div className="-mx-3 md:flex">
                      <div className="md:w-full px-3">
                        <label className="block tracking-wide text-sm font-md mb-2">
                          Catatan Pertemuan
                        </label>
                        <textarea
                          name="notes"
                          className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4 mb-3"
                          onChange={(e) => handleEditSchedule(e.target, idx)}
                          value={schedule.notes}
                        />
                      </div>
                    </div>
                  </div>
                </Accordion>
              )
            })}
            <Accordion
              onClick={() => setAccordionAddSchedule(!accordionAddSchedule)}
              label="Tambah Jadwal"
              expand={accordionAddSchedule}
            >
              <div className="-mx-3 md:flex mb-4 mn:mb-2">
                <div className="md:w-1/2 px-3 mn:mb-4">
                  <Datepicker
                    locale={id}
                    minimumDate={schedules[schedules.length - 1] ? schedules[schedules.length - 1].date : new Date()}
                    date={activeDatePick}
                    onDateChange={(e) => setActiveDatePick(e.value)}
                    label="Tanggal"
                    text={FormatDate.toString(activeDatePick)}
                  />
                </div>
                <div className="md:w-1/2 px-3 mn:mb-2">
                  <Timepicker
                    className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4"
                    label="Jam"
                    type="time"
                    placeholder="15:00"
                    onChange={(e) => setActiveTimePick(e.target.value)}
                    value={activeTimePick}
                  />
                </div>
              </div>
              <div className="-mx-3 md:flex">
                <div className="md:w-full px-3">
                  <label className="block tracking-wide text-sm font-md mb-2">
                    Catatan Pertemuan (Opsional)
                  </label>
                  <textarea
                    id="notes-schedule-input"
                    className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4 mb-3"
                    onChange={(e) => setActiveNotes(e.target.value)}
                    value={activeNotes}
                  />
                </div>
              </div>
              <div className="flex mb-4 justify-end">
                <ButtonPrimary type="button" color="green" className="w-16 h-8" onClick={handleAddSchedule}>
                  <span className="normal-case">
                    Tambahkan
                  </span>
                </ButtonPrimary>
              </div>
            </Accordion>
            <div className="-mx-3 md:flex mb-2 mt-8 justify-end">
              <div className="flex flex-row px-3">
                <ButtonPrimary type="button" onClick={goBack} className="mn:h-8 mn:h-12 mn:w-28">
                  Kembali
                </ButtonPrimary>
                <ButtonPrimary
                  type="submit"
                  color="blue"
                  className="ml-5 mn:h-12 mn:w-28"
                >
                  Buat Kelas
                </ButtonPrimary>
              </div>
            </div>
          </form>
          <Alert
            open={alert.open}
            message={alert.message}
            onClick={() => setAlert({ open: false, message: "" })}
          />
        </div>
      </Dashboard>
    </>
  )
}

export default CreateClass
