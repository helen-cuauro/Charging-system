import express from "express";
import { configDotenv } from "dotenv";
import authRouter from "./routers/auth-router";
import fileRouter from "./routers/cvs-router";
import errorHandler from "./middlewares/error";


if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

export const app = express();

app.use(express.json());
app.use("/", authRouter);
app.use("/", fileRouter);
app.use(errorHandler);



