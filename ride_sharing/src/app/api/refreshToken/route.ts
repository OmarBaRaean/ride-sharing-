// import { cookies } from "next/headers";

// export async function GET(req: Request) {
//   try {
//     console.log("tring torefresh"); // jsut for the debuging

//     const response = await fetch("http://127.0.0.1:8080/refresh", {
//       method: "POST",
//       headers: { Cookie: cookies().toString() },
//       // credentials: "include", // Ensure cookies are sent
//     });

//     if (response.ok) {
//       const data = await response.json();

//       // set the new access token in a cookie
//       cookies().set({
//         name: "access_token_cookie",
//         value: data.access_token,
//         httpOnly: true,
//         path: "/",
//       });
//       return Response.json({ message: "Cookie set successfully" });
//     } else {
//       const data = await response.json();
//       console.log(` error ${data.msg}  data.theToken`);
//       return Response.json({ message: `${data.msg}` }, { status: 404 });
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(`An error occurred: ${error.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return Response.json({ message: `error` }, { status: 500 });
//   }
// }
