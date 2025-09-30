import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/src/db/client";
import { warehouse } from "@/src/db/schema";
import { asc } from "drizzle-orm";

async function getWarehouses() {
  const rows = await db
    .select({
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.location,
      createdAt: warehouse.createdAt,
    })
    .from(warehouse)
    .orderBy(asc(warehouse.name));
  return rows;
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
                  {warehouses.map((w) => (
                    <tr key={w.id} className="border-top">
                      <td className="py-2">{w.name}</td>
                      <td className="py-2">{w.location || '-'}</td>
                      <td className="py-2">{w.createdAt?.slice(0,10) || '-'}</td>
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




