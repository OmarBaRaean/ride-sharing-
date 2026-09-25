import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function Omarheader({ label = "label" }) {
  const router = useRouter();

  return (
    <header className=" md:rounded-[35px] md:bg-opacity-85 sticky top-0 z-50 w-full  bg-myco2 h-20  flex flex-row  items-center will-change-transform">
      <button
        className="bg-myco1 rounded-full h-14 w-14 ml-3 flex justify-center items-center"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="size-8/12 " />
      </button>

      <h1 className="text-5xl text-white font-semibold ml-10">{label}</h1>
    </header>
  );
}
