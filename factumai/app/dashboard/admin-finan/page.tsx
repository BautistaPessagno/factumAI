import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default async function admin_finan() {
  const items = [
    { title: "Facturación", href: "/facturacion" },
    { title: "Finanzas", href: "/Finanzas" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Administracion & Finanzas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="block group">
            <Card className="h-28 flex items-center justify-center transition-shadow hover:shadow-lg">
              <CardHeader className="p-0">
                <CardTitle className="text-center text-base sm:text-lg group-hover:underline">
                  {item.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
