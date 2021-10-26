import { DatePicker } from "react-nice-dates"
import { enUS } from 'date-fns/locale'

export default function Datepicker(props = {
  key: "",
  minimumDate: new Date(),
  date: new Date(),
  locale: enUS,
  onDateChange: () => { },
  label: "Date",
  text: "",
  name: "date"
}) {
  const handleDateChange = (date) => {    
    props.onDateChange({
      name: props.name,
      value: date
    })
  }

  return (
    <DatePicker
      name={props.name}
      locale={props.locale}
      minimumDate={props.minimumDate}
      date={props.date}
      {... props}
      onDateChange={handleDateChange}
    >
      {({ inputProps }) => (
        <div {...inputProps}>
          <label className="block tracking-wide text-sm font-md mb-2">
            {props.label}
          </label>
          <input
            id="date-input"
            className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4"
            type="text"
            onChange={() => { }}
            value={props.text}
          />
        </div>
      )}
    </DatePicker>
  )
}
