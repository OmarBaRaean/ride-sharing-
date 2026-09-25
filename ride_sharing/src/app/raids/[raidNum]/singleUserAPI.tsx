"use server";

import { cookies } from "next/headers";

export interface User {
  name: string;
  phone: string;
}

export async function getAuser(user: string): Promise<User | null> {
  const accessToken = cookies().get("access_token_cookie")?.value;
  console.log("getAuser");
  try {
    const response = await fetch(`http://127.0.0.1:8080/userName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: user }),
    });
    const data = await response.json();
    console.log(`the person response ${data}`);
    if (response.ok) {
      return data;
    }
    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ooooooo" + error.message);
    } else {
      console.log("unknown error");
    }

    return null;
  }
}

export async function joinRaid(raidNum_: string): Promise<number | null> {
  const accessToken = cookies().get("access_token_cookie")?.value;
  console.log("joinRaid");
  try {
    const response = await fetch(`http://127.0.0.1:8080/joinRaid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ raidNum: raidNum_ }),
    });
    return response.status;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("ooooooo" + error.message);
    } else {
      console.log("unknown error");
    }

    return null;
  }
}
