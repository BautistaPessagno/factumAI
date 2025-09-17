import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function createProduct(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const nombre = String(formData.get("nombre") || "").trim();
  const barcode = String(formData.get("barcode") || "").trim();
  const categoria = formData.get("categoria")
    ? Number(formData.get("categoria"))
    : null;

  const { data, error } = await supabase
    .from("products")
    .insert({ nombre, barcode, categoria })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  const amount = formData.get("amount")
    ? Number(formData.get("amount"))
    : 0;
  const warehouseId = formData.get("warehouse_id")
    ? Number(formData.get("warehouse_id"))
    : null;

  if (data?.id && amount && warehouseId) {
    await supabase.from("stock").insert({
      product_id: data.id,
      warehouse_id: warehouseId,
      amount,
    });
  }

  redirect("/dashboard/products");
}

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: warehouses } = await supabase
    .from("warehouse")
    .select("id, name")
    .order("name");

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createProduct} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="nombre">Name</Label>
              <Input id="nombre" name="nombre" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="barcode">Barcode</Label>
              <Input id="barcode" name="barcode" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoria">Category (number)</Label>
              <Input id="categoria" name="categoria" type="number" />
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-2">
              <div className="grid gap-2">
                <Label htmlFor="warehouse_id">Initial Warehouse</Label>
                <select
                  id="warehouse_id"
                  name="warehouse_id"
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Select a warehouse</option>
                  {warehouses?.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Initial Amount</Label>
                <Input id="amount" name="amount" type="number" min={0} />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}




