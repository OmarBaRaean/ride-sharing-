"use client";

import React, { useState } from "react";
import PasswordPlace from "./password";
import LabledQ from "./labledQ";
import OmarLogin from "./myLogIn";
import OmarRegister from "./myRegister";

export default function Login() {
  const [loginsingin, setloginsingin] = useState(true);

  if (loginsingin) {
    return (
      <main className="flex flex-wrap flex-col items-center justify-center p-8 rounded-40 md:bg-myco0  md:bg-opacity-10 md:backdrop-blur-sm md:shadow-lg ">
        <header className="flex justify-between items-center bg-myco1 rounded-40 w-315 h-60 p-3">
          <button
            className="flex justify-center items-center  bg-myco2 rounded-40 w-140 h-10 text-white cursor-pointer"
            onClick={() => setloginsingin(true)}
          >
            login
          </button>
          <button
            className="flex justify-center items-center  bg-myco1 rounded-40 w-140 h-10 text-white cursor-pointer"
            onClick={() => setloginsingin(false)}
          >
            register
          </button>
        </header>
        <OmarLogin />
      </main>
    );
  } else {
    return (
      <main className="flex h-auto flex-col items-center   p-8  rounded-40 md:bg-myco0  md:bg-opacity-10 md:backdrop-blur-sm md:shadow-lg ">
        <header className="flex justify-between items-center bg-myco1 rounded-40 w-315 h-60 p-3  ">
          <div
            className="flex justify-center items-center  bg-myco1  rounded-40 w-140 h-10 text-white"
            onClick={() => setloginsingin(true)}
          >
            login
          </div>
          <div
            className="flex justify-center items-center bg-myco2 rounded-40 w-140 h-10 text-white"
            onClick={() => setloginsingin(false)}
          >
            register
          </div>
        </header>
        <OmarRegister />
      </main>
    );
  }
}
