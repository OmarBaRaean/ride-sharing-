import { RxCrossCircled } from "react-icons/rx";
import {
  Autocomplete,
  AutocompleteItem,
  DateInput,
  TimeInput,
  Input,
} from "@nextui-org/react";
import "./mystyle1.css";
import { useEffect, useState } from "react";

export default function MainFiltter({
  srcs = [],
  decs = [],
  hide = true,
  setHideFilter = function (x: boolean) {},
}) {
  let animals = ["Aardvark", "Kangaroo", "Snake", "dog", "cat", "rat"];

  return (
    <div
      className={`${
        hide && "hidden"
      }  fixed top-0 h-screen w-full bg-black bg-opacity-30 z-30 backdrop-blur-sm delay-300 `}
    >
      <div className="h-500 w-full fixed -bottom-9 bg-white rounded-40">
        <header className="flex items-center border-b-2 border-black h-16 px-2  text-4xl">
          <button>
            <RxCrossCircled
              className="justify-self-start mr-24"
              onClick={() => setHideFilter(true)}
            />
          </button>
          Filter
        </header>
        <section className="flex justify-center ">
          {" "}
          <DateInput
            label={"Date"}
            labelPlacement="inside"
            classNames={{
              label: "text-midume  flex justify-center font-bold text-xl ",
              base: " w-auto mt-3 ",
              inputWrapper:
                "flex items-center justify-center shadow-none  bg-transparent  ",
              input: "justify-center text-xl font-semibold  ",
              innerWrapper:
                "justify-center w-60 mt-2 bg-gray-400  h-14 rounded-md  ",
            }}
          />
        </section>
        <section className="flex justify-center ">
          {" "}
          <TimeInput
            label={"Time"}
            labelPlacement="inside"
            classNames={{
              label: "text-midume  flex justify-center font-bold text-xl ",
              base: " w-auto mt-3 ",
              inputWrapper:
                "flex items-center justify-center shadow-none  bg-transparent  ",
              input:
                "justify-center text-xl font-semibold [&>div]:focus:outline-none ",
              innerWrapper:
                "justify-center w-60 mt-2 bg-gray-400  h-14 rounded-md  ",
            }}
          />
        </section>
        <section className=" flex flex-col mt-3 bg-gree ">
          <span className="w-full centerliz font-semibold text-xl">From</span>
          <Autocomplete
            // label={"SRC"}
            // defaultItems={animals}
            color="secondary"
            labelPlacement="outside-left"
            isClearable={false}
            className=""
            classNames={{
              base: "AutocompleteBase px-8 h-14 sh ",
              endContentWrapper: " w-1/12 group ",
              clearButton:
                " hidden focus-within:only:outline-none group-focus-within:inline-block  delay-200	",
              selectorButton:
                "focus-within:only:outline-none group-focus-within:hidden  delay-200",
              listboxWrapper: "bg-gray-100 rounded-lg",
            }}
          >
            {animals.map((animal) => (
              <AutocompleteItem key={animal}>{animal}</AutocompleteItem>
            ))}
          </Autocomplete>
        </section>

        <section className=" flex flex-col  bg-gree ">
          <span className="w-full centerliz font-semibold text-xl">To</span>
          <Autocomplete
            // label={"SRC"}
            // defaultItems={animals}
            color="secondary"
            labelPlacement="outside-left"
            isClearable={false}
            className=""
            // size=""
            classNames={{
              base: "AutocompleteBase px-8 h-14 sh ",
              endContentWrapper: " w-1/12 group ",
              clearButton:
                " hidden focus-within:only:outline-none group-focus-within:inline-block  delay-200	",
              selectorButton:
                "focus-within:only:outline-none group-focus-within:hidden  delay-200",
              listboxWrapper: "bg-gray-100 rounded-lg",
            }}
          >
            {animals.map((animal) => (
              <AutocompleteItem key={animal}>{animal}</AutocompleteItem>
            ))}
          </Autocomplete>
        </section>

        <section className="centerliz gap-5">
          <button
            className="w-150 bg-myco2 hover:brightness-125 p-1 text-white font-bold centerliz rounded-md "
            onClick={() => setHideFilter(true)}
          >
            apply
          </button>
          <button
            className="w-150 bg-myco2 hover:brightness-125 p-1 text-white font-bold centerliz rounded-md "
            onClick={() => setHideFilter(true)}
          >
            reset
          </button>
        </section>
      </div>
    </div>
  );
}
