"use client";

import { Button } from "@/components/ui/button";

export default function VentaButton() {
  async function handleClick() {
    const { default: confetti } = await import("canvas-confetti");
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
      scalar: 1.1,
    });
  }

  return (
    <Button size="lg" className="px-10 py-6 text-lg" onClick={handleClick}>
      Venta
    </Button>
  );
}
