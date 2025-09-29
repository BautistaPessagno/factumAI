//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from "react";
import { db } from "@/src/db/client";
import { stock, products } from "@/src/db/schema";
import { eq, sum } from "drizzle-orm";

async function getProducts() {
  const rows = await db
    .select({
      id: products.id,
      nombre: products.nombre,
      categoria: products.categoria,
      totalAmount: sum(stock.amount),
    })
    .from(products)
    .leftJoin(stock, eq(stock.productId, products.id))
    .groupBy(products.id, products.nombre, products.categoria);

  return rows;
}

export default async function DashboardProducts() {
  const items = await getProducts();
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h1 className="text-4xl">Dashboard Products</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-3 py-2 border">ID</th>
              <th className="text-left px-3 py-2 border">Product</th>
              <th className="text-left px-3 py-2 border">Categoria</th>
              <th className="text-left px-3 py-2 border">Total</th>
            </tr>
          </thead>
          {items && items.length > 0 ? (
            <tbody>
              {items.map((product: any) => (
                <tr key={product.id}>
                  <td className="px-3 py-2 border">{product.id}</td>
                  <td className="px-3 py-2 border">{product.nombre}</td>
                  <td className="px-3 py-2 border">{product.categoria}</td>
                  <td className="px-3 py-2 border">{product.totalAmount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-4 text-center text-muted-foreground border"
                >
                  No products found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
