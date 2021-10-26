export default function Accordion(props = {
  children: <></>,
  label: "",
  expand: false,
  className: "flex flex-col mb-4",
  onClick: () => { }
}) {
  return (
    <div className={props.className}>
      <div className="flex flex-row text-sm font-semibold mb-3 -ml-2 h-5 w-full">
        <div className="flex flex-row cursor-pointer" onClick={() => props.onClick()}>
          <span>
            {props.label}
          </span>
          <img
            src={props.expand ? "/assets/icons/caret-down-fill.svg" : "/assets/icons/caret-right-fill.svg"}
            width="13"
            height="13"
            className="-mb-1 ml-2"
          />
        </div>
      </div>
      {props.expand && props.children}
    </div>
  )
}