import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
// import { eq } from "drizzle-orm";
// import { clients, warehouse, products, stock } from "./db/schema";

export const db = drizzle(process.env.DATABASE_URL!);
