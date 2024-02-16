// import express from "express";
// import { describe, it, expect } from "vitest";
// import request from "supertest";
// import fileRouter from "../routers/cvs-router";

// describe("File upload endpoint", () => {
//   const app = express();
//   app.use(express.json());
//   app.use("/file", fileRouter);

//   it("should upload a file and return response", async () => {
//     const response = await request(app)
//       .post("/file/upload")
//       .attach("file", "filetest.csv")
//       .expect(200);

//     expect(response.body.ok).toBe(true);
//     expect(response.body.data).toBeDefined();
//     expect(response.body.data.response).toBeDefined();
//     expect(response.body.data.errors).toBeDefined();
//   });

//   it("should return an error if file is not provided", async () => {
//     const response = await request(app).post("/file/upload").expect(401);
//   });
// });
