//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from 'react'
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



export async function getClients() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select();

  return { clients }
}


export default async function DashboardClients() {
  const { clients } = await getClients()
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {clients && clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">CUIT</th>
                    <th className="py-2">IIBB</th>
                    <th className="py-2">Start activity</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client: any) => (
                    <tr key={client.id} className="border-t">
                      <td className="py-2">{client.name}</td>
                      <td className="py-2">{client.cuit || '-'}</td>
                      <td className="py-2">{client.iibb || '-'}</td>
                      <td className="py-2">{client.start_activity || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No clients found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}