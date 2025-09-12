import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getWarehouses() {
  const supabase = await createClient();
  const { data } = await supabase.from("warehouse").select("id, name, location, created_at").order("name");
  return data ?? [];
}

export default async function WarehousesPage() {
  const warehouses = await getWarehouses();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Warehouses</CardTitle>
        </CardHeader>
        <CardContent>
          {warehouses.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Location</th>
                    <th className="py-2">Created</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map((w: any) => (
                    <tr key={w.id} className="border-top">
                      <td className="py-2">{w.name}</td>
                      <td className="py-2">{w.location || '-'}</td>
                      <td className="py-2">{w.created_at?.slice(0,10) || '-'}</td>
                      <td className="py-2 text-right">
                        <Link className="underline underline-offset-4" href={`/dashboard/warehouses/${w.id}`}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No warehouses found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


