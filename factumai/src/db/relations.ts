import { relations } from "drizzle-orm/relations";
import { products, stock, warehouse } from "./schema";

export const stockRelations = relations(stock, ({one}) => ({
	product: one(products, {
		fields: [stock.productId],
		references: [products.id]
	}),
	warehouse: one(warehouse, {
		fields: [stock.warehouseId],
		references: [warehouse.id]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	stocks: many(stock),
}));

export const warehouseRelations = relations(warehouse, ({many}) => ({
	stocks: many(stock),
}));