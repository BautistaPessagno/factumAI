//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from 'react'
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



export async function getProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  return { products }
}


async function getStockWithWarehouse() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('stock')
    .select('amount, product:product_id(id, nombre), warehouse:warehouse_id(id, name)')
    .order('product_id');
  return data ?? [];
}

export default async function DashboardProducts() {
  const { products } = await getProducts();
  const stock = await getStockWithWarehouse();
  const productIdToStock = new Map<number, { amount: number; warehouse?: { id: number; name: string } }>();
  stock.forEach((s: any) => {
    if (!productIdToStock.has(s.product?.id)) {
      productIdToStock.set(s.product?.id, { amount: 0, warehouse: s.warehouse });
    }
    const current = productIdToStock.get(s.product?.id)!;
    current.amount += s.amount || 0;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products && products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr>
                    <th className="py-2">Name</th>
                    <th className="py-2">Barcode</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Stock</th>
                    <th className="py-2">Warehouse</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => {
                    const aggregate = productIdToStock.get(product.id);
                    return (
                      <tr key={product.id} className="border-t">
                        <td className="py-2">{product.nombre}</td>
                        <td className="py-2">{product.barcode || '-'}</td>
                        <td className="py-2">{product.categoria ?? '-'}</td>
                        <td className="py-2">{aggregate?.amount ?? 0}</td>
                        <td className="py-2">{aggregate?.warehouse?.name ?? '-'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No products found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}