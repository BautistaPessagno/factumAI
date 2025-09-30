//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from "react";
import { db } from "@/src/db/client";
import { clients } from "@/src/db/schema";
import { asc } from "drizzle-orm";

async function getClients() {
  const rows = await db.select().from(clients).orderBy(asc(clients.id));

  return rows;
}

export default async function DashboardClients() {
  const clients = await getClients();
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl">Dashboard Clients</h1>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-3 py-2 border">Name</th>
              <th className="text-left px-3 py-2 border">CUIT</th>
            </tr>
          </thead>
          {clients && clients.length > 0 ? (
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-3 py-2 border">{client.name}</td>
                  <td className="px-3 py-2 border">{client.cuit}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan={3}
                  className="px-3 py-4 text-center text-muted-foreground border"
                >
                  No clients found
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {/* <div key={client.id}> */}
        {/* <h2>{client.name}</h2> */}
        {/* <h3>{client.cuit}</h3> */}
        {/* </div> */}
      </div>
    </div>
  );
}
