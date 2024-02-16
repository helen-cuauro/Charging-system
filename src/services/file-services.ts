// import { z } from "zod";
// import { CsvParams, csvSchema } from "../models/cvs";
// import { UserParams, userSchema } from "../models/user";
// // import * as fileDB from "../data/users-data"

// export function validateUsers(userData: UserParams[]) {
//   const success: UserParams[] = [];
//   const errors: any[] = [];

//   for (let i = 0; i < userData.length; i++) {
//     const user = userData[i];
//     try {
//       userSchema.parse(user);
//       success.push(user);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         let newData: { [key: string]: string | number } = {
//           row: i + 1,
//         };
//         for (const subError of error.errors) {
//           newData[subError.path[0]] = subError.message;
//         }
//         errors.push(newData);
//       }
//     }
//   }
//   // const response = await fileDB.insertUser(success)
//   return { success, errors };
// }


import { z } from "zod";
import { UserParams, userSchema } from "../models/user";

export  function validateUsers(userData: UserParams[]) {
  const success: UserParams[] = [];
  const errors: any[] = [];

  for (let i = 0; i < userData.length; i++) {
    const user = userData[i];
    try {
      userSchema.parse(user);
      success.push(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        let newData: { [key: string]: string | number } = {
          row: i + 1,
        };
        for (const subError of error.errors) {
          newData[subError.path[0]] = subError.message;
        }
        errors.push(newData);
      }
    }
  }
//   const response = await fileDB.insertUsersIntoDatabase(success)
  return { success, errors };
}
