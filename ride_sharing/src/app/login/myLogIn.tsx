import Link from "next/link";
import PasswordPlace from "./password";
import LabledQ from "./labledQ";
import { useEffect, useState } from "react";
import LoadingScreen from "../loadingScreen";
import { useRouter } from "next/navigation";
import { loginhandler, userAuthenticationInfo } from "../Myapis";

export default function OmarLogin() {
  const router = useRouter();
  //loading
  const [hideLoading, setHideLoading] = useState(true);

  // joined login information
  const [loginInfo, setLoginInfo] = useState<userAuthenticationInfo | null>(
    null
  );
  //seprated login information
  const [userEmail, setUserName] = useState<string>();
  const [userPassword, setUserpassword] = useState<string>();
  const [rememberMe, setRememberMe] = useState(false);

  //will run once the login button is clicked
  function handleLogin() {
    if (userEmail && userPassword) {
      setLoginInfo({ username: userEmail, password: userPassword });
    }
    //if the user did not fill the login information he will resive this alert
    else alert("please fill in all the informations");
  }

  useEffect(() => {
    //send the information to the server to check it
    if (loginInfo) {
      setHideLoading(false);
      loginhandler(loginInfo, rememberMe).then((response) => {
        if (response) {
          console.log(`response : ${response}`);
          router.push("/raids");
        }
      });
    }
  }, [loginInfo]);

  return (
    <>
      <LabledQ
        label="Username"
        setterFunction={setUserName}
        palcehold="Enter username or email"
      />
      <PasswordPlace setterFunction={setUserpassword} />
      <section className="flex  justify-around items-center w-full my-10 px-6">
        <label className="justify-self-start text-sm">
          <input
            type="checkbox"
            className="mr-1"
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>
        <Link href={"nnnnn"} className="text-blue-500 justify-self-end text-sm">
          Forget Password?
        </Link>
      </section>
      <button
        className="bg-myco10 w-56 h-12 mt-2 rounded-40 text-white"
        onClick={handleLogin}
      >
        Login
      </button>
      {/* the loading screen  */}
      <LoadingScreen hideLoadingDes={hideLoading} />
    </>
  );
}
