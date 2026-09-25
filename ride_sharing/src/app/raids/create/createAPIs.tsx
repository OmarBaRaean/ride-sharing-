"use server";

import { isLogedin } from "@/app/Myapis";
import { cookies } from "next/headers";

export interface newRaid {
  src: string;
  des: string;
  raidTime: Date;
  passnumber: number;
}

export async function addNewRaid(newRaid: newRaid): Promise<boolean> {
  console.log("adding a new raid"); //debuging
  const accessToken = cookies().get("access_token_cookie")?.value;
  const logedin = await isLogedin();
  if (logedin) {
    try {
      const response = await fetch("http://127.0.0.1:8080/raids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newRaid),
      });
      if (!response.ok) {
        return false;
      }
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log("unknown error");
      }
      return false;
    }
  }
  return false;
}
