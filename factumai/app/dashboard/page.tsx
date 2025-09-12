import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();
  const [{ count: clientsCount }, { count: productsCount }] = await Promise.all([
    supabase.from("clients").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
  ]);

  const { data: lowStock } = await supabase
    .from("stock")
    .select("amount, product:product_id(nombre)")
    .lte("amount", 5)
    .order("amount", { ascending: true })
    .limit(5);

  return { clientsCount: clientsCount ?? 0, productsCount: productsCount ?? 0, lowStock: lowStock ?? [] };
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
              {lowStock.map((s: any, idx: number) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{s.product?.nombre ?? "Unnamed"}</span>
                  <span className="text-muted-foreground">{s.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">All good. No low stock items.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}