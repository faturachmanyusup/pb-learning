import Head from "next/head"
import { getSession } from 'next-auth/react'
import Dashboard from "components/Layout/Dashboard"
import Calendar from "components/Calendar"
import { useState } from "react"
import Time from "libs/Time"
import { GET } from "libs/request"
import config from "config/config"

const CalendarPage = (props = { schedules: [] }) => {
  const [schedules, setSchedules] = useState(props.schedules)
  const [calendar, setCalendar] = useState(new Time())
  const [events, setEvents] = useState([{
    date: null,
    notes: ""
  }])

  const updateDetail = (d) => {
    const temp = schedules.filter(sch => {
      const temp = new Time(sch.date)

      sch.date = new Time(sch.date)

      return temp.date === d.date && temp.month === d.month && temp.year === d.year
    })

    if (!temp.length) {
      setEvents([{
        date: d,
        notes: ""
      }])
    } else {
      setEvents(temp)
    }
  }

  const onMonthChange = (month) => {
    const temp = new Time(calendar.year, month)

    updateSchedule(temp.year, temp.month)
    setCalendar(temp)
  }

  const onYearChange = (year) => {
    const temp = new Time(year, calendar.month)

    updateSchedule(temp.year, temp.month)
    setCalendar(temp)
  }

  const goToNextMonth = () => {
    const temp = new Time(calendar.year, calendar.month)
    temp.addMonth(1)

    updateSchedule(temp.year, temp.month)
    setCalendar(temp)
  }

  const goToPreviousMonth = () => {
    const temp = new Time(calendar.year, calendar.month)
    temp.subtractMonth(1)

    updateSchedule(temp.year, temp.month)
    setCalendar(temp)
  }

  const goToToday = () => {
    const temp = new Time()

    updateSchedule(temp.year, temp.month)
    setCalendar(temp)
  }

  const updateSchedule = (year, month) => {
    return GET(config.url.base + `/api/schedule/get-all?year=${year}&month=${month}`, {
      session: JSON.stringify(props.session)
    })
      .then(res => setSchedules(res.data.schedules))
      .catch(err => {
        // error here
      })
  }

  return (
    <>
      <Head>
        <title>PB-Learning - Semua Jadwal</title>
        <meta name="description" content="Lihat semua jdawal" />
        <meta property="og:title" key="calendar" content="PB-Learning - Semua Jadwal" />
        <meta property="og:description" content="Lihat semua jdawal" />
        <meta name="theme-color" content="#FF4B2B" />
      </Head>
      <Dashboard user={props.session.user}>
        <div className="flex flex-col-reverse lg:grid grid-cols-12">
          <div className="mt-8 lg:mt-0 col-start-1 col-end-5">
            <div className="flex flex-row justify-between lg:mr-5 mb-5">
              <div className="font-bold">Jadwal</div>
              <div>{events[0]?.date?.localeString || ''}</div>
            </div>
            {events.map((event, idx) => (
              <div key={idx}>
                {event.class?.name
                  ? (
                    <>
                      <div className="flex flex-row justify-between lg:mr-5">
                        <div>{event.class?.name}</div>
                        <div>{event.date?.hour}:{event.date?.minute} WIB</div>
                      </div>
                      <div>{event.notes}</div>
                    </>
                  ) : (
                    "Tidak ada jadwal"
                  )
                }
              </div>
            ))}
          </div>
          <div className="col-start-5 col-end-13">
            <Calendar
              show={calendar}
              schedules={schedules}
              onDateClick={(date) => updateDetail(date)}
              onMonthChange={(month) => onMonthChange(month)}
              onYearChange={(year) => onYearChange(year)}
              onClickNext={goToNextMonth}
              onClickBack={goToPreviousMonth}
              onClickNow={goToToday}
            />
          </div>
        </div>
      </Dashboard>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/login'
        }
      }
    }

    const res = await GET(config.url.base + `/api/schedule/get-all?month=${new Time().month}`, {
      session: JSON.stringify(session)
    })

    if (res.status !== 200) throw res

    return {
      props: {
        schedules: res.data.schedules,
        session: session
      }
    }
  } catch (err) {
    return {
      props: {
        schedules: [],
        session: {}
      }
    }
  }
}

export default CalendarPage
