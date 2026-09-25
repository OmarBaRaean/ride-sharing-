export default function Raidsrcdec({
  src = "src",
  des = "des",
  color = "bg-myco0 ",
  boxHight = "",
}) {
  return (
    <div
      className={`flex flex-col rounded-xl w-full  ${color} items-center justify-center h-182 ${boxHight} py-4 `}
    >
      <span className="flex flex-col items-start justify-center w-full h-full mb-1 ">
        <label
          htmlFor="q1"
          className="self-start px-4 text-my14 text-white font-normal "
        >
          Form
        </label>
        <p
          id="q1"
          title={src}
          className={`focus:outline-none bg-transparent w-full h-60 ${boxHight} flex  items-center placeholder-black px-5 text-xl font-semibold border-b-2 border-black md:truncate cursor-default `}
        >
          {src}
        </p>
      </span>

      <span className="flex flex-col items-start justify-center w-full h-full mb-1 ">
        <label
          htmlFor="q1"
          className="self-start px-4 text-my14 text-white font-light "
        >
          To
        </label>
        <p
          id="q1"
          title={des}
          className={`focus:outline-none bg-transparent w-full h-60 ${boxHight} flex  items-center placeholder-black px-5 text-xl md:truncate font-semibold cursor-default`}
        >
          {des}
        </p>
      </span>
    </div>
  );
}
