const ButtonOutline = (props) => {
  return (
    <button {...props } className="button-primary button-outline">
      {props.children}
    </button>
  )
}

export default ButtonOutline