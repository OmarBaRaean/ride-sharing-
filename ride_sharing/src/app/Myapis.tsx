"use server";
import { cookies } from "next/headers";

export async function loginhandler(
  loginInfo: userAuthenticationInfo,
  rememberMe: boolean
): Promise<string> {
  try {
    console.log("set login"); // jsut for the debuging

    const Response = await fetch("http://127.0.0.1:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInfo: loginInfo,
        rememberMeDes: rememberMe,
      }),
      credentials: "include", // Ensure cookies are included in the request
    });
    // wrong usename or password
    if (!Response.ok) {
      return "wrong user name or password";
    }
    // the  login was seccuessfull
    const data = await Response.json();

    cookies().set({
      name: "refresh_token_cookie",
      value: data.refresh_token,
      httpOnly: true,
      path: "/",
      maxAge: data.refresh_token_age,
    });
    cookies().set({
      name: "access_token_cookie",
      value: data.access_token,
      httpOnly: true,
      path: "/",
    });
    const accessToken = data.access_token;
    // Store the access token in local storage or context for further use
    // localStorage.setItem("accessToken", accessToken);
    return "accessToken is setted";
  } catch (error: unknown) {
    if (error instanceof Error) {
      return `An error occurred: ${error.message}`;
    } else {
      return "An unknown error occurred";
    }
  }
}

export interface userAuthenticationInfo {
  username: string;
  password: string;
}

// export function refresh() {}

// export async function refreshAccessToken(): Promise<string> {
//   "use server";

// }
export async function isLogedin(): Promise<boolean> {
  "use server";
  console.log("isLogedIn running"); // jsut for the debuging
  const accessToken = cookies().get("access_token_cookie")?.value;
  try {
    const Response = await fetch("http://127.0.0.1:8080/only_headers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!Response.ok) {
      return false;
    } else {
      console.log("logged in"); // jsut for the debuging
      const data = await Response.json();
      console.log(data);
      return true;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`error message : ${error.message}`);
    } else {
      console.log(`unkown error`);
    }

    return false;
  }
}
