import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as tables from "./schema";
import * as relations from "./relations";

// Reuse the connection in dev to avoid creating too many connections
declare global {
  var __drizzle__: ReturnType<typeof drizzle> | undefined;
}

function createDb() {
  const useSsl = process.env.DATABASE_SSL === "true" || process.env.NODE_ENV === "production";
  const client = postgres(process.env.DATABASE_URL!, {
    max: 1,
    ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  const schema = { ...tables, ...relations } as const;
  return drizzle(client, { schema });
}

export const db = global.__drizzle__ ?? createDb();

if (process.env.NODE_ENV !== "production") {
  global.__drizzle__ = db;
}
