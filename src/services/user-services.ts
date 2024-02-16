import { z } from "zod";
import { UserParams, userSchema } from "../models/user";
import { insertUsersIntoDatabase } from "../data/users-data";

export  async function validateUsers(userData: UserParams[]) {
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
  const response = await insertUsersIntoDatabase(success)
  return { response, errors };
}



