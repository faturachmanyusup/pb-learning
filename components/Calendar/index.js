import Time from "libs/Time"
import { useEffect, useState } from "react";

const Calendar = (props = {
  show: new Time(),
  schedules: [],
  onDateClick: () => { },
  onMonthChange: () => { },
  onYearChange: () => { },
  onClickNext: goToNextMonth,
  onClickBack: goToPreviousMonthgoToNextMonth,
  onClickNow: goToTodaygoToNextMonth
}) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    generateCalendar()
  }, [props.show])

  const generateCalendar = () => {
    let temp = []

    // add previous month dates to calender
    let lastMonth = new Time(props.show)
    lastMonth.setDate(0)
    for (let i = props.show.firstDayOfMonth - 1; i >= 0; i--) {
      temp.push(new Time(lastMonth.year, lastMonth.month, lastMonth.date - i))
    }

    // add current month dates to calender
    for (let i = 1; i <= props.show.lastDateOfMonth; i++) {
      temp.push(new Time(props.show.year, props.show.month, i))
    }

    // add next month dates to calender
    const nextMonth = new Time(props.show.year, props.show.month, 1)
    nextMonth.addMonth(1)
    for (let i = temp.length, j = 0; i < 35; i++, j++) {
      temp.push(new Time(nextMonth.year, nextMonth.month, nextMonth.date + j))
    }

    setEvents(temp)
  }

  const getClassName = (date, idx) => {
    const today = new Time()

    if ((idx < 7 && date.date > 15) || (idx > 28 && date.date < 15)) {
      return `
        bg-white-500 text-xs h-10vw text-center flex flex-col justify-between px-1 py-1 text-gray-300
        md:px-2 md:text-base lg:h-100px lg:text-base
        hover:bg-yellow-200 hover:text-gray-900 cursor-pointer
      `
    } else if (date.date === today.date && date.month === today.month && date.year === today.year) {
      return `
        text-xs bg-indigo-200 h-10vw text-center flex flex-col justify-between px-1 py-1 cursor-pointer
        md:px-2 md:text-base lg:h-100px lg:text-base
        hover:bg-yellow-200 hover:text-gray-900
      `
    } else {
      return `
        bg-white-500 text-xs h-10vw text-center flex flex-col justify-between px-1 py-1 cursor-pointer
        md:px-2 md:text-base lg:h-100px lg:text-base
        hover:bg-yellow-200 hover:text-gray-900
      `
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between text-xs lg:text-base">
        <div className="flex flex-row gap-0.5 lg:gap-2 mb-3 lg:mb-5">
          <select value={props.show.month} onChange={(e) => props.onMonthChange(e.target.value)}>
            <option value={0}>Januari</option>
            <option value={1}>Februari</option>
            <option value={2}>Maret</option>
            <option value={3}>April</option>
            <option value={4}>Mei</option>
            <option value={5}>Juni</option>
            <option value={6}>Juli</option>
            <option value={7}>Agustus</option>
            <option value={8}>September</option>
            <option value={9}>Oktober</option>
            <option value={10}>November</option>
            <option value={11}>Desember</option>
          </select>
          <select value={props.show.year} onChange={(e) => props.onYearChange(e.target.value)}>
            <option value={2015}>2015</option>
            <option value={2016}>2016</option>
            <option value={2017}>2017</option>
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
        <div>
          <button onClick={props.onClickBack} className="hover:scale-125">
            {"<<"}
          </button>
          <button className="mx-3 lg:mx-14 hover:scale-125" onClick={props.onClickNow}>
            Hari ini
          </button>
          <button onClick={props.onClickNext} className="hover:scale-125">
            {">>"}
          </button>
        </div>
      </div>
      <div className="hidden relative lg:grid grid-cols-7 gap-px bg-gray-400 border border-gray-400">
        <div className="bg-white-500 text-center font-bold text-base py-2">Minggu</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Senin</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Selasa</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Rabu</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Kamis</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Jumat</div>
        <div className="bg-white-500 text-center font-bold text-base py-2">Sabtu</div>
      </div>
      <div className="lg:hidden relative grid grid-cols-7 gap-px bg-gray-400 border border-gray-400">
        <div className="bg-white-500 text-center font-bold text-sm py-2">Min</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Sen</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Sel</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Rab</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Kam</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Jum</div>
        <div className="bg-white-500 text-center font-bold text-sm py-2">Sab</div>
      </div>
      <div className="relative grid grid-cols-7 grid-rows-5 gap-px bg-gray-400 border border-gray-400">
        {events.map((date, idx) => (
          <div
            key={idx}
            className={getClassName(date, idx)}
            onClick={() => props.onDateClick(date)}
          >
            <div>{date.date}</div>
            <div id={`schedule-container-${date.date}-${date.month}-${date.year}`} className="flex flex-col gap-0.5 lg:gap-2">
              {props.schedules.find(sch => {
                const temp = new Time(sch.date)

                return temp.date === date.date && temp.month === date.month && temp.year === date.year
              }) && (
                <>
                  {/* <div className="rounded-full md:text-base flex flex-col border-b-2 lg:border-b-4 lg:border-t-4 bg-blue-700 border-blue-700"></div>
                  <div className="rounded-full md:text-base flex flex-col border-b-2 lg:border-b-4 lg:border-t-4 bg-green-700 border-green-700"></div>
                  <div className="rounded-full md:text-base flex flex-col border-b-2 lg:border-b-4 lg:border-t-4 bg-red-500 border-red-500"></div> */}
                  <div className="rounded-full md:text-base flex flex-col border-b-2 lg:border-b-4 lg:border-t-4 bg-green-700 border-green-700"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
