export default function Timepicker(props = {
  name: "time",
  label: "Time",
  placeholder: "",
  onChange: () => {},
  value: ""
}) {
  return (
    <>
      <label className="block tracking-wide text-sm font-md mb-2">
        {props.label}
      </label>
      <input
        className="appearance-none mn:text-sm block w-full bg-gray-lighter text-gray-darker border border-gray-lighter rounded py-3 px-4"
        type="time"
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        value={props.value}
        {...props}
      />
    </>
  )
}