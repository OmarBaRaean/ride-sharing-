"use server";

import { cookies } from "next/headers";
import { isLogedin } from "../Myapis";

export interface Raid {
  id: string;
  src: string;
  des: string;
  dateTime: Date;
  passengersNumber: number;
  passengersArray: string[];
}

export async function getAllRaids(): Promise<Raid[] | null> {
  const accessToken = cookies().get("access_token_cookie")?.value;
  const logedin = await isLogedin();
  if (logedin) {
    try {
      const response = await fetch("http://127.0.0.1:8080/raids", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("failed to fetch the raids");
        return null;
      }
      // now will will add elements to the array
      const data = await response.json();
      // console.log(data);

      const raidsArr: Raid[] = data.map((item: any) => ({
        id: item._id.$oid, // Convert ObjectId to string
        src: item.src,
        des: item.des,
        dateTime: new Date(item.raidTime["$date"]),
        passengersNumber: item.passnumber,
        passengersArray: item.passengers,
      }));
      // console.log(raidsArr);

      return raidsArr;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log("unknown error");
      }

      return null;
    }
  }
  return null;
}

export async function getSingleRaid(raidID: string): Promise<Raid | null> {
  const accessToken = cookies().get("access_token_cookie")?.value;
  const logedin = await isLogedin();
  if (logedin) {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/raids?raidID=${raidID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.log("failed to fetch the raids");
        return null;
      }
      const data = await response.json();

      const theRaid: Raid = {
        id: data._id.$oid, // Convert ObjectId to string
        src: data.src,
        des: data.des,
        dateTime: new Date(data.raidTime["$date"]),
        passengersNumber: data.passnumber,
        passengersArray: data.passengers,
      };
      console.log(theRaid);

      return theRaid;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.log("unknown error");
      }

      return null;
    }
  }
  return null;
}

export async function getUserName() {
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
      return null;
    } else {
      const data = await Response.json();
      return data.name;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`error message : ${error.message}`);
    } else {
      console.log(`unkown error`);
    }

    return null;
  }
}
