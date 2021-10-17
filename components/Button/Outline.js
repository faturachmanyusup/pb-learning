const ButtonOutline = (props) => {
  return (
    <button {...props} className="button-primary button-outline flex flex-row items-center">
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

export default ButtonOutline