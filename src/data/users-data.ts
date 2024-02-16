import { pool } from "../db";

import bcrypt from "bcrypt";
import { UserParams } from "../models/user";

export async function insertUsersIntoDatabase(users: UserParams[]) {
  const queryText =
    "INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *";
  const insertedUsers = [];

  try {
    for (const user of users) {
      // Verifica si el correo electrónico ya existe en la base de datos
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [user.email]
      );

      if (existingUser.rows.length === 0) {
        // Si el correo electrónico no existe, procede con la inserción
        const hashedPassword = await bcrypt.hash("supersecret", 10); // Hash de la contraseña supersecret

        const values = [
          user.name,
          user.email,
          hashedPassword,
          user.age !== undefined ? user.age : null,
        ];
        const result = await pool.query(queryText, values);
        insertedUsers.push(...result.rows);
      } else {
        console.warn(
          `El correo electrónico '${user.email}' ya existe en la base de datos. Ignorando la inserción.`
        );
      }
    }

    return insertedUsers;
  } catch (error) {
    console.error("Error al insertar usuarios en la base de datos:", error);
    throw error;
  }
}





