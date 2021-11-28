const Message = (props = {
  img: {},
  alt: "",
  text: ""
}) => {
  return (
    <div className="w-full px-2 md:px-3 py-2 rounded-lg border border-gray-500 mt-5 flex flex-row items-start">
      <div className="rounded-full w-10 mt-1 text-center mr-1 md:mr-2">
        <img
          src={props.img || "/assets/icons/person-fill.svg"}
          alt={props?.alt || "user"}
          width="100"
          height="100"
          className="rounded-full"
        />
      </div>
      <div className="w-full rounded-full px-1 md:px-3 md:mr-4 self-center">
        {props.text}
      </div>
    </div>
  )
}

export default Message
