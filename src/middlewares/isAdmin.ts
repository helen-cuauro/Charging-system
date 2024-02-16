import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "./error";

// Extendemos el objeto Request para incluir la propiedad user
declare global {
  namespace Express {
    interface Request {
      email?: string;
      role?: string;
    }
  }
}

const jwtSecret = "ultra-secret";

export function isAdminHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ApiError("No autorizado", 401));
  }

  try {
    const payload = jwt.verify(token, jwtSecret) as {
      email: string;
      role: string;
      iat: number;
      exp: number;
    };

    if (payload.role === "admin") {
      next();
    } else {
      return next(new ApiError("No autorizado", 401));
    }
  } catch (error) {
    return next(new ApiError("No autorizado", 401));
  }
}
