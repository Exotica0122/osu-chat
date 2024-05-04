import { migrate } from "drizzle-orm/postgres-js/migrator";
import { conn, db } from ".";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await migrate(db, { migrationsFolder: __dirname + "/migrations" });

await conn.end();
