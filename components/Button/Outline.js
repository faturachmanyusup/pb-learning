const ButtonOutline = (props) => {
  return (
    <button {...props} className="button-primary button-outline flex flex-row items-center">
      {props.children}
    </button>
  )
}

export default ButtonOutline