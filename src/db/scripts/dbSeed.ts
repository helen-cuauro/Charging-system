import { configDotenv } from "dotenv";
import { query, pool } from "..";

if (process.env["NODE_ENV"] === "test") {
  configDotenv({ path: ".env.test" });
} else {
  configDotenv();
}

query(`INSERT INTO users (name, email, password, role)
VALUES ('helen', 'helen@mail.com', '$2a$12$2SF71VDfC7iWsZBM3QbvOO0J07FOxGwYq1Bzw6i5VfP67/nMu9rpG', 'admin');
  `).then(() => {
  console.log("primer usuario insertado");
  pool.end();
});
