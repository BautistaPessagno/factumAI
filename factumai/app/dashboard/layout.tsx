import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AuthButton } from "@/components/auth-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SideChatToggle } from "@/components/side-chat-toggle";
import { Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="border-r bg-card/30">
        <div className="h-16 flex items-center px-4 border-b font-semibold">
          <Link href="/dashboard">FactumAI</Link>
        </div>
        <nav className="p-4 space-y-2 text-sm">
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard"
          >
            Home
          </Link>
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard/ventas"
          >
            Ventas
          </Link>
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard/clients"
          >
            Clients
          </Link>
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard/products"
          >
            Products & Stock
          </Link>
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard/warehouses"
          >
            Warehouses
          </Link>
          <Link
            className="block rounded-md px-3 py-2 hover:bg-accent"
            href="/dashboard/admin-finan"
          >
            Administracion & finanzas
          </Link>
        </nav>
      </aside>
      <div className="flex flex-col min-h-screen">
        <header className="h-16 border-b flex items-center justify-between px-4 gap-4 relative">
          <div className="w-full max-w-md">
            <Input placeholder="Search…" />
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="size-4" /> Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href="/dashboard/clients/new">
                  <DropdownMenuItem>Add client</DropdownMenuItem>
                </Link>
                <Link href="/dashboard/products/new">
                  <DropdownMenuItem>Add product</DropdownMenuItem>
                </Link>
                <Link href="/dashboard/warehouses/new">
                  <DropdownMenuItem>Add warehouse</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeSwitcher />
            <AuthButton />
            <SideChatToggle />
          </div>
        </header>
        <main className="p-6 flex-1 bg-background">{children}</main>
      </div>
    </div>
  );
}
