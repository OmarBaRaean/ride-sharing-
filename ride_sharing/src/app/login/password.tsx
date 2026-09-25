"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

export default function PasswordPlace({
  label = "Password",
  margint = "mt-10",
  autoCompleteOption = "current-password",
  setterFunction,
}: {
  label?: string;
  margint?: string;
  autoCompleteOption?: string;
  setterFunction: (x: string) => void;
}) {
  const [hide, setHide] = useState(true);

  const inputType = hide ? "password" : "text";

  return (
    <div className={`${margint} flex gap-x-6 gap-y-8 sm:grid-cols-6`}>
      <div className="sm:col-span-4">
        <label
          htmlFor="password"
          className="block text-sm font-bold leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <div className="flex items-center justify-center shadow-sm ring-1 rounded-40 ring-inset focus:outline-none ring-myco1 focus-within:ring-4 focus-within:ring-inset focus-within:ring-indigo-300  w-315 px-1">
            <input
              type={inputType}
              name="username"
              id="password"
              autoComplete={autoCompleteOption}
              onChange={(e) => setterFunction(e.target.value)}
              className="block flex-1 border-0 bg-transparent p-1.5 pl-3 rounded-40 text-gray-900 focus:outline-none  placeholder:text-gray-400   w-11/12 h-14 "
              placeholder="Enter your password"
            ></input>
            <button
              onClick={() => setHide(!hide)}
              className="w-1/12 [&>*]:w-full"
            >
              {hide ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
