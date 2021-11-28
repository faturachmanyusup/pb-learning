const Message = (props = {
  send: () => { },
  session: {},
  updateText: () => { }
}) => {
  const handleSend = (e) => {
    document.getElementById('form-message').innerHTML = ''
    props.send(e)
  }

  return (
    <form
      onSubmit={handleSend}
      className="
        w-full px-1 md:px-3 py-2 rounded-lg border border-gray-500
        mt-5 flex flex-row items-start justify-start
      "
    >
      <div className="rounded-full w-10 mt-1 text-center ml-1 md:ml-0 md:mr-2">
        <img
          src={props.session?.user?.image || "/assets/icons/person-fill.svg"}
          alt={props.session?.user?.name || "user"}
          width="100"
          height="100"
          className="rounded-full"
        />
      </div>
      <div
        id="form-message"
        contentEditable={true}
        aria-multiline={true}
        onInput={(e) => props.updateText(e.currentTarget.textContent)}
        className="w-7/12 md:w-10/12 pl-2 rounded-full self-center focus:outline-none"
        suppressContentEditableWarning={true}
      >
      </div>
      <div className="flex flex-row self-end ml-auto">
        <button title="attach" name="attach" type="button" className="md:mr-3 self-end">
          <i className="fas fa-paperclip text-xl md:text-2xl mx-2 cursor-pointer" />
        </button>
        <button title="submit" name="submit" type="submit" className="md:mr-2 self-end">
          <i className="fas fa-paper-plane text-xl md:text-2xl mx-2 cursor-pointer" />
        </button>
      </div>
    </form>
  )
}

export default Message
