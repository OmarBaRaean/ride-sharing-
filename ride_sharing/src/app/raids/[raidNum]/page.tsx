"use client";

import Omarheader from "../create/theheader";
import Raidsrcdec from "../raidsrcdec";
import { FaUsers } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import Person from "./user";
import { getSingleRaid, Raid } from "../riadsAPI";
import { use, useEffect, useState } from "react";
import { getAuser, joinRaid, User } from "./singleUserAPI";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/app/loadingScreen";

export default function Raidid({ params }: { params: { raidNum: string } }) {
  const router = useRouter();
  const [theRaid, setRaid] = useState<Raid | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTheRaid = async () => {
      setLoading(true);
      const users_: User[] = [];
      const Raid_ = await getSingleRaid(params.raidNum);
      if (Raid_) {
        for (const x of Raid_.passengersArray) {
          let tempUser = await getAuser(x);
          if (tempUser) {
            users_.push(tempUser);
          }
        }
      } else {
        router.push("/raid");
      }
      setUsers(users_);
      setRaid(Raid_);
    };

    getTheRaid();
    setLoading(false);
  }, []);

  async function handelJoin() {
    setLoading(true);
    const response = await joinRaid(params.raidNum);

    if (response === 200) {
      alert(`you have joined the raid`);
    } else if (response === 404) {
      alert(`raid not found`);
    } else if (response === 304) {
      alert(`raid is full`);
    } else if (response === 409) {
      alert(`you are already in this raid`);
    } else {
      alert("somthing went wrong");
    }
    router.push("/raids");
  }

  return (
    <div className="md:flex md:flex-col md:justify-center  w-full   ">
      <LoadingScreen hideLoadingDes={!loading} />

      <Omarheader label="Description" />
      <main className=" max-w-[10000px] flex flex-col items-center container px-3 py-4  bg-white h-auto min-h-screen  overflow-scroll lg:overflow-hidden lg:px-[20%] ">
        {theRaid ? (
          <>
            <Raidsrcdec src={theRaid.src} des={theRaid.des} boxHight="h-auto" />
            <section
              className={`flex flex-col rounded-xl w-full bg-myco0 items-center justify-center h-182 py-4 mt-4 [&>*]:text-2xl *:font-semibold `}
            >
              <div>
                {`${theRaid?.dateTime.getDate()}/${
                  theRaid?.dateTime.getMonth() + 1
                }/${theRaid?.dateTime.getFullYear()} `}{" "}
              </div>
              <div>
                {`${theRaid.dateTime
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${theRaid.dateTime
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")} `}
              </div>
            </section>

            <section
              className={`flex flex-col rounded-xl w-full bg-myco0 items-center justify-center h-auto minh py-2 px-1 mt-4`}
            >
              <div className="w-full h-14 mb-1 flex justify-around text-3xl">
                <FaUsers className="text-5xl" />(
                {`${theRaid.passengersArray.length}`})
              </div>
              {users.map((item, index) => (
                <Person key={index} name={item.name} />
              ))}
            </section>

            <button
              onClick={handelJoin}
              className="w-full h-16 flex justify-center bg-myco10 rounded-xl mt-3 items-center font-semibold text-white"
            >
              join
            </button>
          </>
        ) : (
          <div className="">no raid</div>
        )}
      </main>
    </div>
  );
}
