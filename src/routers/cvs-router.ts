import express from "express";
import { isAdminHandler } from "../middlewares/isAdmin";
import multer from "multer";
import * as fs from "fs";
import { validateUsers } from "../services/user-services";
import { User } from "../models/user";
import { readCSV } from "../utils/readCSV";

const fileRouter = express.Router();
const upload = multer({ dest: "uploads/" });

fileRouter.post(
  "/upload",
  isAdminHandler,
  upload.single("file"),

  async (req, res, next) => {
    try {
      const csvFilePath = (req.file as Express.Multer.File).path;
      const users = await readCSV(csvFilePath);
      const { response, errors } = await validateUsers(users);
      fs.unlinkSync(csvFilePath);

      const responseData = {
        response: response.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          age: user.age,
        })),
        errors,
      };

      res.status(200).json({ ok: true, data: responseData });
    } catch (error) {
      next(error);
    }
  }
);

export default fileRouter;
