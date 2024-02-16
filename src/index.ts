import express from "express";
import authRouter from "./routers/auth-router";
import fileRouter from "./routers/cvs-router";

const app = express();
const port = 5000;

app.use(express.json());
app.use("/", authRouter);
app.use("/", fileRouter);


app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
