import { IoPersonCircle } from "react-icons/io5";

export default function Person({ name = "omar", imgSrc = "" }) {
  return (
    <div className="w-full h-12 bg-gray-400  rounded-40 flex items-center border-2 border-black px-5 font-medium text-2xl mb-2">
      <div className="overflow-hidden h-full w-12 rounded-full mr-3 ">
        {imgSrc === "" ? (
          <IoPersonCircle className="w-full h-full" />
        ) : (
          <img src={imgSrc} alt="Profile" className=" rounded-full" />
        )}
      </div>
      {name}
    </div>
  );
}
