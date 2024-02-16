import * as fs from "fs";
import csv from "csv-parser";
import { UserParams } from "../models/user";

export function readCSV(csvFilePath: string): Promise<UserParams[]> {
  return new Promise((resolve, reject) => {
    const users: UserParams[] = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (user: any) => {
        user.age = user.age === "" ? undefined : parseInt(user.age);
        users.push(user);
      })
      .on("end", () => {
        resolve(users);
      })
      .on("error", reject);
  });
}
