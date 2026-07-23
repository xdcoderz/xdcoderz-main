import type { ReactNode } from "react";
import { NewsletterPopup } from "@/features/subscribers/components/NewsletterPopup";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
      <NewsletterPopup />
    </div>
  );
}
