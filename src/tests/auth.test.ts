import express from "express";
import authRouter from "../routers/auth-router"; 
import { it, expect } from "vitest";
import request from "supertest";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

it("Authentication endpoint - successful login", async () => {
  const validUser = { email: "helen@mail.com", password: "supersecret" };
  const response = await request(app).post("/auth/login").send(validUser);

  expect(response.status).toBe(200);
  expect(response.body.ok).toBe(true);
  expect(response.body.message).toBe("Login exitoso");
  expect(response.body.data.token).toBeTruthy();
});

it("Authentication endpoint - invalid login", async () => {
  const invalidUser = {
    email: "helen@mail.com",
    password: "supersecre",
  };
  const response = await request(app).post("/auth/login").send(invalidUser);

  expect(response.status).toBe(401); 
});
