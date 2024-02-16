import express from "express";
import { isAdminHandler } from "../middlewares/isAdmin";
import multer from "multer";
import * as fs from "fs";
import csv from "csv-parser";
import { validateUsers } from "../services/file-services";
import { insertUsersIntoDatabase } from "../data/users-data";
import { UserParams } from "../models/user";

const fileRouter = express.Router();

const upload = multer({ dest: "uploads/" });

fileRouter.post(
  "/upload",
  //isAdminHandler,
  upload.single("file"),
  async (req, res, next) => {
    console.log(req.file);

    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se proporcionó ningún archivo CSV" });
      }

      // Ruta del archivo CSV subido
      const csvFilePath = req.file.path;

      // Array para almacenar los campos del CSV

      const users: UserParams[] = [];

      // Leer el archivo CSV y procesar sus campos
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (user) => {
          user.age = user.age === "" ? undefined : parseInt(user.age);
          users.push(user);
        })
        .on("end", async () => {
          const { success, errors } = validateUsers(users);
          // const userSusse = userValidations[0];

          try {
            const insertedUsers = await insertUsersIntoDatabase(success);
            fs.unlinkSync(csvFilePath);

            const responseData = {
              success: insertedUsers.map((user) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
              })),
              errors,
            };

            res.status(200).json({
              ok: true,
              data: responseData,
            });
          } catch (error) {
            console.error(
              "Error al insertar usuarios en la base de datos:",
              error
            );
            res.status(500).json({
              error: "Error al insertar usuarios en la base de datos",
            });
          }
        });
    } catch (error) {
      console.error("Error al procesar archivo CSV:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
);
export default fileRouter;






















