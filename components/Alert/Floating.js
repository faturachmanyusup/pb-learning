const content = {
  success: {
    icon: "/assets/icons/check-green.svg",
    bgColor: "bg-green-500 border-green-700",
  },
  danger: {
    icon: "/assets/icons/cross-red.svg",
    bgColor: "bg-red-400 border-red-600",
  }
}

export default function Floating({
  open = false,
  type = "success",
  message = "",
  onClick = () => {}
}) {
  if (!open) return <></>;

  return (
    <div
      id="floating-notification"
      className={
        `h-50 w-50 absolute bottom-24 animate-fade-out right-16 z-50
        flex items-center border-l-4 py-2 px-3 shadow-md
        mb-2 cursor-pointer ` + content[type].bgColor
      }
      onClick={onClick}
    >
      <div className="rounded-full bg-white-500 mr-3">
        <img src={content[type].icon} />
      </div>
      <div className="text-white-500 max-w-xs ">
        {message}
      </div>
    </div>
  )
}