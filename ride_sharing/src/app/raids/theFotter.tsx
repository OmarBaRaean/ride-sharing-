"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaCar } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import LoadingScreen from "../loadingScreen";
// import { refreshToken } from "../myApis_clientsSide";

export default function Omarfotter() {
  const [hideLoadDes, setLoadDes] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const goToraids = () => {
    if (pathname != "/raids") {
      router.push("/raids");
      setLoadDes(false);
      // console.log("goToraids");
    }
  };
  const goToCreate = async () => {
    router.push("/raids/create");
    setLoadDes(false);
    // console.log("goToAccount");
  };

  const goToAccount = () => {
    if (pathname != "/account") {
      router.push("/account");
      setLoadDes(false);
      // console.log("goToAccount");
    }
  };
  return (
    <>
      <footer className="flex flex-row justify-between px-4 items-center bg-myco10 h-20 w-full fixed z-10 bottom-0  left-0 overflow-visible">
        <div>
          <button onClick={goToraids}>
            <FaCar className="size-16 text-white" />
          </button>
        </div>

        <div className="bg-myco10 size-32 pt-2 rounded-full flex justify-center items-start">
          <button
            className="bg-gray-200 rounded-full size-24"
            onClick={goToCreate}
          >
            <IoMdAddCircleOutline className="size-full" />
          </button>
        </div>
        <div>
          <button onClick={goToAccount}>
            <IoPersonSharp className="size-16 text-white" />
          </button>
        </div>
      </footer>

      <LoadingScreen hideLoadingDes={hideLoadDes} />
    </>
  );
}
