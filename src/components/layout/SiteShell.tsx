import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-neutral-950 transition-colors dark:bg-neutral-950 dark:text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
