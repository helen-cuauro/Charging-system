import express from "express";
import jwt from "jsonwebtoken";
import { validateCredentials } from "../services/auth-services";

const authRouter = express.Router();

const jwtSecret = "ultra-secret";

authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await validateCredentials(req.body);
    const payload = { email: user.email, role: user.role };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    res.json({ ok: true, message: "Login exitoso", data: { token } });
  } catch (error) {
    next(error);
  }
});


export default authRouter;
