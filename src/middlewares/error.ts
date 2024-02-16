import { NextFunction, Request, Response } from "express";
import { z } from "zod";

declare module "zod" {
  interface ZodError {
    status?: number;
  }
}

export class ApiError extends Error {
  status: number;
  details?: Record<string, any>;

  constructor(message: string, status: number, details?: Record<string, any>) {
    super(message);
    this.status = status;
    this.details = details;
  }
}


export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("Error handler!");

  if (error instanceof z.ZodError) {
    const validationErrors = error.errors.map((err) => ({
      message: err.message,
      path: err.path,
    }));
    res.status(400).json({
      ok: false,
      error: {
        message: "Error de validación",
        details: validationErrors,
      },
    });
  } else if (error instanceof ApiError) {
    if (error.status === 401) {
      res.status(401).json({
        ok: false,
        error: {
          message: "Credenciales inválidas",
        },
      });
    } else {
      res.status(error.status).json({
        ok: false,
        error: {
          message: error.message,
          details: error.details,
        },
      });
    }
  } else {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: {
        message: "Error interno del servidor",
      },
    });
  }
}
