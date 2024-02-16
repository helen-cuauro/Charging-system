import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL DEFAULT 'supersecret',
    age INTEGER CHECK (age > 0),
    role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    CONSTRAINT chkemail CHECK (email IS NULL OR email ~* '^[A-Za-z0-9.%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')
);`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE users`);
};
