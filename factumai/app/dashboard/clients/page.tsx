//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from 'react'
import { createClient } from '@/lib/supabase/server';



export async function getClients() {
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select();

  return { clients }
}


export default async function DashboardClients() {
  const { clients } = await getClients()
        return (
    <div>
      <h1>Dashboard Clients</h1>
    {clients && clients.length >0 ? (
      clients.map((client: any) => (
        <div key={client.id}>
          <h2>{client.name}</h2>
          <h3>{client.cuit}</h3>
        </div>
      ))
    ) : (
      <p>No Clients Found...</p>
    )}
     
    </div>
  )
}