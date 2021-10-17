const ButtonPrimary = (props) => {
  return (
    <button {...props } className="button-primary">
      {props.children}
    </button>
  )
}

export default ButtonPrimary