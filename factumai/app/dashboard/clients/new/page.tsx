import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { db } from "@/src/index";
import { clients } from "@/src/db/schema";

export const dynamic = "force-dynamic";

async function createClientRow(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const cuit = String(formData.get("cuit") || "").trim();
  const iibb = String(formData.get("iibb") || "").trim();
  const startActivity = String(formData.get("start_activity") || "").trim();

  const client = {
    name: name,
    cuit: cuit,
    iibb: iibb,
    start_activity: startActivity,
  };

  await db.insert(clients).values(client);

  redirect("/dashboard/clients");
}

export default function NewClientPage() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New Client</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createClientRow} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cuit">CUIT</Label>
              <Input id="cuit" name="cuit" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="iibb">IIBB</Label>
              <Input id="iibb" name="iibb" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="start_activity">Start Activity</Label>
              <Input id="start_activity" name="start_activity" type="date" />
            </div>
            <div className="pt-2">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
