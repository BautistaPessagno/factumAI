import { db } from "@/src/db/client";
import { warehouse, stock, products } from "@/src/db/schema";
import { asc, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getWarehouse(id: number) {
  const rows = await db
    .select({
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      createdAt: warehouse.createdAt,
    })
    .from(warehouse)
    .where(eq(warehouse.id, id))
    .limit(1);
  return rows[0] ?? null;
}

async function getWarehouseProducts(id: number) {
  const rows = await db
    .select({
      amount: stock.amount,
      product: {
        id: products.id,
        nombre: products.nombre,
        barcode: products.barcode,
        categoria: products.categoria,
      },
    })
    .from(stock)
    .leftJoin(products, eq(stock.productId, products.id))
    .where(eq(stock.warehouseId, id))
    .orderBy(asc(stock.productId));
  return rows;
}

export default async function WarehouseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const warehouseId = Number(id);
  const warehouseRow = await getWarehouse(warehouseId);
  const stockRows = await getWarehouseProducts(warehouseId);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Warehouse info</CardTitle>
        </CardHeader>
        <CardContent>
          {warehouseRow ? (
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Name</div>
                <div>{warehouseRow.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Location</div>
                <div>{warehouseRow.location || "-"}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Created</div>
                <div>{warehouseRow.createdAt?.slice(0, 10) || "-"}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Warehouse not found.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products in this warehouse</CardTitle>
        </CardHeader>
        <CardContent>
          {stockRows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Barcode</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stockRows.map((row, idx: number) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2">
                        {row.product?.nombre ?? "Unnamed"}
                      </td>
                      <td className="py-2">{row.product?.barcode ?? "-"}</td>
                      <td className="py-2">{row.product?.categoria ?? "-"}</td>
                      <td className="py-2">{row.amount ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No products in this warehouse.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
