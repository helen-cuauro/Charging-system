import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email("El campo 'email' no es válido"),
  password: z
    .string()
    .min(6, "Password debe tener al menos 6 caracteres")
    .default("superSecret"),
  name: z.string().min(1, "el nombre no puede estar vacio"),
  age: z
    .number()
    .refine((age) => age >= 0, {
      message: "La edad no puede ser negativa",
      path: ["age"],
    })
    .refine((age) => age !== 0, {
      message: "La edad no puede ser cero",
      path: ["age"],
    })
    .optional(),
  role: z
    .enum(["admin", "user"], {
      errorMap: () => ({ message: "Role solo puede ser 'user' o 'admin'" }),
    })
    .default("user"),
});

export type UserParams = z.infer<typeof userSchema>;
export type User = UserParams & { id: number };
