"use client";
import { BsPersonCircle } from "react-icons/bs";
import Omarfotter from "../raids/theFotter";
import { FaHistory } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import PasswordPlace from "../login/password";

export default function Account() {
  const [hide, setHide] = useState(true);
  return (
    <>
      <header className=" fixed z-10  w-full h-20 bg-myco10 text-4xl md:top-0 font-semibold p-2 text-white flex justify-between">
        Account
      </header>
      <main className="h-screen pt-20 w-full flex flex-col items-center p-2 [&>section]:mt-5 md:w-[50%] ">
        <section className="rounded-full flex justify-center items-center w-6/12 max-w-64">
          <BsPersonCircle className="size-full" />
        </section>
        <section className="w-full flex justify-center items-center">
          <p className="w-9/12 bg-myco01 h-10 rounded-md  flex justify-center items-center font-m ">
            Name
          </p>
        </section>
        <section className="w-full flex-col justify-center items-center px-7 flex-wrap *:w-full *:h-14 *:flex *:justify-center *:items-center *:rounded-xl *:mb-5 *:gap-10 *:bg-myco1 *:bg-opacity-75 *:text-2xl [&>*>*]:text-3xl  ">
          <button onClick={() => setHide(false)}>
            change password <TbPasswordUser />
          </button>
          <button>
            history <FaHistory />
          </button>
        </section>
      </main>
      <div
        className={`${
          hide && "hidden"
        }  fixed top-0 h-screen w-full bg-black bg-opacity-30 z-30 backdrop-blur-sm delay-300 flex justify-center items-center `}
      >
        <main className="bg-white rounded-xl h-2/6 w-10/12 py-2 flex flex-col pb-4  justify-center items-center ">
          <header className="flex items-center w-full px-4 border-b-2 border-black h-16  text-3xl">
            <RxCrossCircled
              className="justify-self-start mr-10"
              onClick={() => setHide(true)}
            />
            reset password
          </header>
          <PasswordPlace margint="mt-4" />
          <PasswordPlace label="confirms password" margint="mt-4" />

          <button className="h-10 w-60 bg-myco2 hover:bg-myco0 rounded-lg mt-3 text-white">
            reset
          </button>
        </main>
      </div>
      <Omarfotter />
    </>
  );
}
