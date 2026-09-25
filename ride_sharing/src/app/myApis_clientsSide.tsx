// "use client";

// import { promises } from "dns";
// import { error } from "console";
// import {
//   loginhandler,
//   refreshAccessToken,
//   userAuthenticationInfo,
// } from "./Myapis";

// export async function refreshToken(): Promise<boolean> {
//   console.log("tring torefresh"); // jsut for the debuging
//   const tockenRefreshed = await refreshAccessToken();
//   console.log(`the answer is : ${tockenRefreshed}`);
//   if (!tockenRefreshed.includes("error ")) {
//     // await goToCreate();
//     localStorage.setItem("access_token", tockenRefreshed);
//     console.log(`accese token refresherd`);
//     return true;
//   } else {
//     return false;
//   }
// }

// export async function setLogin(
//   loginInfo: userAuthenticationInfo,
//   rememberMe: boolean
// ): Promise<boolean> {
//   console.log("set login"); // jsut for the debuging

//   const response = await loginhandler(loginInfo, rememberMe);

//   if (response.includes("wrong ")) {
//     alert(response);
//     return false;
//   } else if (response.includes("error ")) {
//     alert(response);
//     return false;
//   } else {
//     localStorage.setItem("access_token", response);
//     return true;
//   }
// }
