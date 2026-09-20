"use client";

import { StoreProvider } from "@/lib/store";
import { FlyProvider } from "@/components/ui/fly-to-cart";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <FlyProvider>{children}</FlyProvider>
    </StoreProvider>
  );
}
