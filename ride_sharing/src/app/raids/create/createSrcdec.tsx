import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gautocomplete from "./gAoutcomplete";
import { useEffect, useState } from "react";

export default function CreateSrcdes({
  srcSetter,
  desSetter,
}: {
  srcSetter: (x: string) => void;
  desSetter: (x: string) => void;
}) {
  const [src, setSrc] = useState("");
  const [des, setDes] = useState("");
  useEffect(() => {
    // console.log(`the new src: ${src}`);
    srcSetter(src);
  }, [src]);
  useEffect(() => {
    // console.log(`the new des: ${des}`);
    desSetter(des);
  }, [des]);
  return (
    <div className="flex flex-col rounded-40 w-full  bg-myco01 items-center justify-center h-182 py-4 px-5 brightness-90">
      <span className="flex flex-col items-start justify-center  w-full max-w-[340px] mb-1 h-1/2">
        <label htmlFor="q1" className="w-full text-gray-600 ">
          Form
        </label>
        <Gautocomplete
          setterFunction={setSrc}
          id="q1"
          placeholder="src"
          className="focus:outline-none bg-transparent w-full h-60 placeholder-black text-my28 font-medium border-b-2 border-white"
        />
      </span>

      {/* <button className="absolute self-end justify-self-center rounded-full flex items-center justify-center z-40 bg-white w-20 h-20">
        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          className=" w-11 h-11 text-my14 rotate-90 text-myco10 brightness-95 "
        />
      </button> */}

      <span className="flex flex-col items-start justify-center w-full max-w-[340px] h-1/2">
        <label htmlFor="q2" className="w-full text-gray-600 text-my14">
          To
        </label>
        <Gautocomplete
          setterFunction={setDes}
          id="q2"
          placeholder="des"
          className="focus:outline-none bg-transparent w-full h-60 placeholder-black text-my28 font-medium bo"
        />
      </span>
    </div>
  );
}
