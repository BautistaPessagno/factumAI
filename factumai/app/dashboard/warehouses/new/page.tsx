import { db } from "@/src/db/client";
import { warehouse } from "@/src/db/schema";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

async function createWarehouse(formData: FormData) {
  "use server";
  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();

  await db.insert(warehouse).values({ name, location });
  redirect("/dashboard/warehouses");
}

export default function NewWarehousePage() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New Warehouse</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createWarehouse} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" />
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


