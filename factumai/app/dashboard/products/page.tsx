//dashboard clasico con opciones para ver los productos, stock, finanzas y ventas

import React from 'react'
import { createClient } from '@/lib/supabase/server';



export async function getProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select();

  return { products }
}


export default async function DashboardProducts() {
  const { products } = await getProducts()
        return (
    <div>
      <h1>Dashboard Products</h1>
    {products && products.length >0 ? (
      products.map((product: any) => (
        <div key={product.id}>
          <h2>{product.nombre}</h2>
        </div>
      ))
    ) : (
      <p>No Products Found...</p>
    )}
     
    </div>
  )
}