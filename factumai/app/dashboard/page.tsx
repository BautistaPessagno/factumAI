import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/src/db/client";
import { clients, products, stock } from "@/src/db/schema";
import { asc, count, eq, lte } from "drizzle-orm";

async function getCounts() {
  const [{ count: clientsCount }] = await db.select({ count: count() }).from(clients);
  const [{ count: productsCount }] = await db.select({ count: count() }).from(products);

  const lowStockRows = await db
    .select({
      amount: stock.amount,
      productId: products.id,
      productNombre: products.nombre,
    })
    .from(stock)
    .leftJoin(products, eq(stock.productId, products.id))
    .where(lte(stock.amount, 5))
    .orderBy(asc(stock.amount), asc(products.nombre));

  const lowStock = lowStockRows.map((row) => ({
    amount: row.amount,
    product: { nombre: row.productNombre ?? null },
  }));

  return {
    clientsCount: Number(clientsCount ?? 0),
    productsCount: Number(productsCount ?? 0),
    lowStock,
  };
}

export default async function Dashboard() {
  const { clientsCount, productsCount, lowStock } = await getCounts();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{clientsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{productsCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Low stock (≤ 5)</CardTitle>
        </CardHeader>
        <CardContent>
          {lowStock.length ? (
            <ul className="space-y-2 text-sm">
              {lowStock.map(
                (
                  s: {
                    amount: number | null;
                    product: { nombre: string | null };
                  },
                  idx: number,
                ) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{s.product?.nombre ?? "Unnamed"}</span>
                    <span className="text-muted-foreground">{s.amount}</span>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              All good. No low stock items.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
