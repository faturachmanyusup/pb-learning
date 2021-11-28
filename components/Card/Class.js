import Link from "next/link"

export default function ClassCard(props = {
  image: "",
  className: "",
  label: "",
  title: "",
  description: "",
  classCode: ""
}) {
  return (
    <Link href={'/class/forum/' + props.classCode}>
      <div className={`bg-white transform motion-safe:active:scale-98 rounded-lg shadow-xl cursor-pointer ${props.className}`}>
        <img className="md:h-28 rounded w-full object-cover object-center mb-4" src={props.image} />
        <div className="px-3 pb-4">
          <h3 className="mn:text-md sm:text-md md:h-5 tracking-widest text-indigo-500 text-xs font-medium">
            {props.label}
          </h3>
          <h2 className="mn:text-xl sm:text-xl md:h-8 text-gray-900 font-medium md:mb-4 mn:mb-2 sm:mb-2">
            {props.title}
          </h2>
          <p className="mn:text-base sm:text-base md:h-12 leading-relaxed text-sm overflow-ellipsis overflow-hidden">
            {props.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
