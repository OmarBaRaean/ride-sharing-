import Link from "next/link";
import PasswordPlace from "./password";
import LabledQ from "./labledQ";
import { useEffect, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import LoadingScreen from "../loadingScreen";

interface userInfo {
  name: string;
  _id: string;
  password: string;
  phone: string;
  gender: string;
}

export default function OmarRegister() {
  const registerMT = "mt-1"; //just used to set the margin top
  //loading
  const [hideLoading, setHideLoading] = useState(true);
  // the full user information
  const [theUser, setTheUser] = useState<userInfo | null>(null);

  // each proberty of the user information
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confermPassword, setConferPass] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [gender, setGEnder] = useState<string | null>(null);
  ("");
  function addNewUser() {
    setHideLoading(false);
    // this function will set the new user info to "theUser" value
    if (userName && email && password && confermPassword && phone && gender) {
      if (password === confermPassword) {
        // check if the conferm password the same as password
        //creats a new user of type userInfo
        const newUser: userInfo = {
          name: userName,
          _id: email,
          password: password,
          phone: phone,
          gender: gender,
        };
        setTheUser(newUser);
      } else {
        setHideLoading(true); //remove the loading
        alert("conferm password does not match password");
      }
    } else {
      setHideLoading(true); //remove the loading
      alert("Please fill all the fields");
    }
  }

  useEffect(() => {
    if (theUser) {
      //will uplaod the data to the database
      fetch("http://127.0.0.1:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theUser),
      }).finally(() => {
        setTheUser(null);
        setHideLoading(true); //remove the loading
      });
    }
  }, [theUser]);

  return (
    <>
      <LabledQ
        label="Unversity Email"
        palcehold="s202002020202@kfupm.edu.sa"
        margint={registerMT}
        autoCompleteOption="email"
        setterFunction={setEmail}
      />
      <LabledQ
        label="first name"
        palcehold="Enter your name "
        autoCompleteOption="given-name"
        margint={registerMT}
        setterFunction={setUserName}
      />
      <LabledQ
        label="last name name"
        palcehold="Enter your family name "
        autoCompleteOption="family-name"
        margint={registerMT}
        setterFunction={setUserName}
      />
      <PasswordPlace margint={registerMT} setterFunction={setPassword} />
      <PasswordPlace
        label="Conferm Password"
        margint={registerMT}
        setterFunction={setConferPass}
      />
      <LabledQ
        label="Phone number"
        palcehold="05123456789"
        margint={registerMT}
        setterFunction={setPhone}
      />
      <section className="p-3 w-315 h-28 flex items-center justify-around [&>*]:ring-2 [&>*]:ring-gray-300 [&>*]:p-2 [&>*]:rounded-lg *:h-full *:w-24  [&>*>*]:w-full [&>*>*]:h-full">
        <div
          className={
            gender === "m"
              ? " !ring-blue-400 bg-blue-300 !bg-blur-sm text-blue-700"
              : ""
          }
          onClick={() => setGEnder("m")}
        >
          <FaMale />
        </div>
        <div
          className={
            gender === "f"
              ? "!ring-pink-300 bg-pink-200 bg-blur-sm text-pink-700"
              : ""
          }
          onClick={() => setGEnder("f")}
        >
          <FaFemale />
        </div>
      </section>
      <button
        className="bg-myco10 w-56 h-12 mt-3  rounded-40 text-white"
        onClick={addNewUser}
      >
        Register
      </button>
      {/* the loading screen  */}
      <LoadingScreen hideLoadingDes={hideLoading} />
    </>
  );
}
