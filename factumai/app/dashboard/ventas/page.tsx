import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import VentaButton from "./VentaButton";

export const dynamic = "force-dynamic";

async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    return null;
  }
  return data.claims as { email?: string; sub?: string } | null;
}

export default async function VentasPage() {
  const user = await getUser();

  return (
    <div className="relative min-h-[60vh]">
      <div className="grid gap-4 sm:grid-cols-2 mb-24">
        <Card>
          <CardHeader>
            <CardTitle>Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            {user ? (
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  {user.email ?? "-"}
                </div>
                <div>
                  <span className="text-muted-foreground">ID:</span>{" "}
                  {user.sub ?? "-"}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No autenticado</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="fixed left-1/2 -translate-x-1/2 bottom-10">
        <VentaButton />
      </div>
    </div>
  );
}
