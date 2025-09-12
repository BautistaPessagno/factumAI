import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getWarehouse(id: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("warehouse")
    .select("id, name, location, created_at")
    .eq("id", id)
    .single();
  return data;
}

async function getWarehouseProducts(id: number) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("stock")
    .select("amount, product:product_id(id, nombre, barcode, categoria)")
    .eq("warehouse_id", id)
    .order("product_id");
  return data ?? [];
}

export default async function WarehouseDetail({ params }: { params: { id: string } }) {
  const warehouseId = Number(params.id);
  const [warehouse, stock] = await Promise.all([
    getWarehouse(warehouseId),
    getWarehouseProducts(warehouseId),
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Warehouse info</CardTitle>
        </CardHeader>
        <CardContent>
          {warehouse ? (
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Name</div>
                <div>{warehouse.name}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Location</div>
                <div>{warehouse.location || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Created</div>
                <div>{warehouse.created_at?.slice(0,10) || '-'}</div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Warehouse not found.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products in this warehouse</CardTitle>
        </CardHeader>
        <CardContent>
          {stock.length ? (
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
                  {stock.map((row: any, idx: number) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2">{row.product?.nombre ?? 'Unnamed'}</td>
                      <td className="py-2">{row.product?.barcode ?? '-'}</td>
                      <td className="py-2">{row.product?.categoria ?? '-'}</td>
                      <td className="py-2">{row.amount ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No products in this warehouse.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


