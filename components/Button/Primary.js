const ButtonPrimary = (props) => {
  return (
    <button {...props} className="button-primary flex flex-row items-center">
      {props.loading
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