export default function UserCard(props = {
  name: "",
  className: "",
  email: "",
  img: "",
  asMentor: false
}) {
  return (
    <div className={`rounded-3xl shadow-xl max-w-xs my-3 bg-blue-500 ${props.className}`}>
      {props.asMentor && (
        <div className=" float-right -mt-5 -mr-5 rounded-full p-2 bg-green-500 text-white-500">Mentor</div>
      )}

      <div className="w-full h-28 bg-white-500"></div>
      <div className="flex justify-center -mt-8">
        <img src={props.img || "/assets/icons/person-fill.svg"} className="rounded-full border-solid border-white border-2 -mt-8" width={50} />
      </div>
      <div className="text-center px-3 pb-6 pt-5">
        <h2 className="text-white-500 text-sm font-semibold">{props.name}</h2>
        <h2 className="text-white-500 text-sm font-normal">{props.email}</h2>
      </div>
      <div className="flex justify-center pb-3 text-white px-9">
        <div className="text-center text-white-500 mr-3 border-r pr-3">
          <h2>34</h2>
          <span>Kehadiran</span>
        </div>
        <div className="text-center text-white-500">
          <h2>42</h2>
          <span>Nilai</span>
        </div>
      </div>
    </div>
  )
}
