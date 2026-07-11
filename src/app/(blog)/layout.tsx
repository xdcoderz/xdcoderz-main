import type { ReactNode } from "react";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import { BlogMasthead } from "@/features/blog/components/BlogMasthead";
import "./blog.css";

const journalDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-journal-display",
  display: "swap",
});

const journalText = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-journal-text",
  display: "swap",
});

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`blog-scope ${journalDisplay.variable} ${journalText.variable}`}>
      <BlogMasthead />
      {children}
    </div>
  );
}
