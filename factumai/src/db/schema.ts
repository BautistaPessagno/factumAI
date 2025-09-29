import {
  pgTable,
  foreignKey,
  bigint,
  timestamp,
  smallint,
  varchar,
  text,
  primaryKey,
  date,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const stock = pgTable(
  "stock",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "stock_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    productId: bigint("product_id", { mode: "number" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    warehouseId: bigint("warehouse_id", { mode: "number" }),
    amount: smallint(),
  },
  (table) => [
    foreignKey({
      columns: [table.productId],
      foreignColumns: [products.id],
      name: "stock_product_id_fkey",
    }).onUpdate("cascade"),
    foreignKey({
      columns: [table.warehouseId],
      foreignColumns: [warehouse.id],
      name: "stock_warehouse_id_fkey",
    }).onUpdate("cascade"),
  ],
);

export const products = pgTable("products", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "product_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  nombre: varchar(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  barcode: varchar(),
  categoria: smallint(),
});

export const warehouse = pgTable("warehouse", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "warehouse_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  name: text(),
  location: varchar(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const clients = pgTable(
  "clients",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).generatedByDefaultAsIdentity({
      name: "Cliente_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
    }),
    name: text(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    cuit: varchar().notNull(),
    iibb: varchar(),
    startActivity: date("start_activity"),
    adressId: smallint("adress_id"),
  },
  (table) => [
    primaryKey({ columns: [table.id, table.cuit], name: "Cliente_pkey" }),
  ],
);
