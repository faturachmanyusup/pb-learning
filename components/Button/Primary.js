const ButtonPrimary = (props) => {
  const color = props.color || "primary"
  const size= props.size || "md"

  let className = `button-${color} ${size} flex flex-row items-center justify-center `
  className = className + (props.className || "")

  return (
    <button {...props} className={className}>
      {props.loading === "true"
        ? (
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )
        : (
          props.children
        )}
    </button>
  )
}

export default ButtonPrimary