import { ApiError } from "../middlewares/error";
import { User, UserParams } from "../models/user";
import * as userDB from "../data/user-data";
import bcrypt from "bcrypt";

export async function validateCredentials(
    credentials: UserParams
  ): Promise<User> {
    const { email, password } = credentials;
    const user = await userDB.getUserByEmail(email);
  
    const isValid = await bcrypt.compare(password, user?.password || "");
  
    if (!user ) {
      throw new ApiError("usuario no existe", 401);
    }   
    if (!isValid) {
        throw new ApiError("Credenciales incorrectas", 401);
      }
  
    return user;
  }