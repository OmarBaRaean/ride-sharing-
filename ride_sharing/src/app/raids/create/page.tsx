"use client";

import { DateInput, TimeInput } from "@nextui-org/react";
import CreateSrcdes from "./createSrcdec";
import { useEffect, useState } from "react";
import Omarheader from "./theheader";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { newRaid, addNewRaid } from "./createAPIs";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loadingScreen";

export default function Createraid() {
  const router = useRouter();
  //the full new raid componant
  const [theNewRaid, setNewRaid] = useState<newRaid | null>(null);
  //seprated raid elemnts
  const [src, setSrc] = useState("");
  const [des, setDes] = useState("");
  const [RaidTime, setTime] = useState("");
  const [RaidDate, setDate] = useState("");
  const [numPass, setNumPass] = useState(3);
  //loading desseation
  const [loading, setLoading] = useState(false);

  //post the raid to the database
  const handelCreate = async () => {
    let Raid_date = new Date(`${RaidDate} ${RaidTime}`);
    let currentDate = new Date();
    setLoading(true);
    console.log(`${Raid_date}`);
    if (src != des) {
      if (RaidDate != "") {
        if (Raid_date > currentDate) {
          let temp_raid: newRaid = {
            src: src,
            des: des,
            raidTime: new Date(Raid_date),
            passnumber: numPass,
          };
          setNewRaid(temp_raid);
        } else {
          alert("raid date need to be at least one day form today");
        }
      } else {
        alert(`no raid date`);
      }
    } else {
      alert(`invalid src des input`);
    }
    setLoading(false);
  };

  // runs after the new raid is created
  useEffect(() => {
    console.log("useeffect is called");
    const addRaid = async () => {
      if (theNewRaid) {
        const response = await addNewRaid(theNewRaid);
        if (!response) {
          setLoading(false);
          alert("somthing went wrong!!");
          return;
        }
        alert("raid created");
        router.push("/raids");
      }
    };

    addRaid();
  }, [theNewRaid]);

  return (
    <div className=" max-w-[500px] md:w-[90%] md:p-4 md:bg-myco0  md:bg-opacity-20 md:backdrop-blur-sm md:shadow-lg rounded-40">
      <LoadingScreen hideLoadingDes={!loading} />
      <Omarheader label="Create ride" />
      <main className="flex h-auto flex-col   p-3  [&>*]:mt-7">
        <CreateSrcdes srcSetter={setSrc} desSetter={setDes} />

        <TimeInput
          // labelPlacement="outside-left"
          label="TIME"
          classNames={{
            label: "text-gray-500 text-base",
            base: "rounded-xl justify-center itmes-center w-full h-20  bg-myco0 bg-opacity-35 mt-5 p-3",
            inputWrapper: "shadow-none bg-transparent",
            input: "justify-center text-xl font-semibold",
          }}
          className="w-full "
          onChange={(e) => setTime(`${e.hour}:${e.minute}`)}
        />

        <DateInput
          label={"Birth date"}
          classNames={{
            label: "text-gray-500 text-base",
            base: "rounded-xl justify-center itmes-center w-full h-20  bg-myco0 bg-opacity-35 mt-5 p-3",
            inputWrapper: "shadow-none bg-transparent",
            input: "justify-center text-xl font-semibold",
          }}
          className="w-full "
          onChange={(e) => setDate(`${e.year}-${e.month}-${e.day}`)}
          minValue={today(getLocalTimeZone())} // this does not work
        />

        <div className="flex flex-col rounded-xl  w-full h-20 bg-myco0 bg-opacity-35 mt-5 p-3">
          <span className="text-gray-500 flex self-start justify-self-start text-base w-full">
            Passengers
          </span>
          <div className="w-full flex flex-row justify-center items-center mt-2">
            <button
              className=" rounded-md flex justify-center flex-wrap align-middle items-center w-6 h-6 bg-gray-400"
              onClick={() => numPass < 7 && setNumPass(numPass + 1)}
            >
              <TiArrowSortedUp className="size-full" />
            </button>

            <p className="rounded-md mx-1 flex justify-center items-center bg-white w-8 h-7">
              {numPass}
            </p>

            <button
              className=" rounded-md flex justify-center  align-middle items-center w-6 h-6 bg-gray-400"
              onClick={() => numPass > 2 && setNumPass(numPass - 1)}
            >
              <TiArrowSortedDown className="size-full" />
            </button>
          </div>
        </div>

        {/* the create button */}
        <button
          onClick={handelCreate}
          className={`bg-myco2 w-full h-16  text-white mt-4 rounded-3xl text-3xl`}
        >
          create raid
        </button>
      </main>
    </div>
  );
}
