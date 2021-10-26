const ButtonOutline = (props) => {
  return (
    <button className="button-primary button-outline flex flex-row items-center" {...props}>
      {props.children}
    </button>
  )
}

export default ButtonOutline