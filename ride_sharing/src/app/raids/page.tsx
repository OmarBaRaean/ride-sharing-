"use client";

import RaidElement from "./raid";
import { FiFilter } from "react-icons/fi";
import Omarfotter from "./theFotter";
import MainFiltter from "./theFilter";
import { useEffect, useState } from "react";
import { getAllRaids, getUserName, Raid } from "./riadsAPI";
import LoadingScreen from "../loadingScreen";

export default function RaidsPage() {
  const [hideFilter, setHideFilter] = useState(true);
  const [loading, setLoading] = useState(true);
  const [raids, setRaids] = useState<Raid[] | null>(null);

  const [name, setName] = useState<string | null>();

  //

  useEffect(() => {
    const loadRaids = async () => {
      const allRaids: Raid[] | null = await getAllRaids();
      const name_ = await getUserName();
      setRaids(allRaids);
      setName(name_);
    };
    loadRaids();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingScreen hideLoadingDes={!loading} />;
  }
  return (
    <div className=" flex justify-center  w-full   ">
      <header className="fixed z-10  w-full  h-16 bg-myco10 text-4xl font-semibold p-2 text-white flex justify-between  ">
        Main
        <button
          className=" bg-gray-200 end rounded-full w-12 h-12 flex justify-center items-center"
          onClick={() => setHideFilter(false)}
        >
          <FiFilter className="text-4xl text-black " />
        </button>
      </header>

      <main className=" w-full max-w-[10000px] flex-grow flex flex-col items-center container px-3 pt-20 pb-28 bg-gray-400 h-auto min-h-screen  md:flex-wrap md:flex-row md:justify-evenly  md:gap-y-[5%]">
        <div className="w-full">{`hello.. ${name}!`}</div>
        {raids ? (
          raids.map((item, index) => <RaidElement key={index} raid={item} />)
        ) : (
          <div className="">no raids</div>
        )}
      </main>

      <MainFiltter hide={hideFilter} setHideFilter={setHideFilter} />
      <Omarfotter />
    </div>
  );
}
