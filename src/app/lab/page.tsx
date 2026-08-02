import type { Metadata } from "next";
import { OpenProductLab } from "@/features/open-product-lab";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Open Product Lab",
  description:
    "Explore open-source XDCoderz projects, product experiments, automation systems, and practical software builds in public.",
  alternates: {
    canonical: `${site.url}${routes.lab}`,
  },
};

export default function LabPage() {
  return (
    <>
      <section className="lab-hero">
        <div className="home-container">
          <p className="section-kicker">Open Product Lab</p>
          <h1>Public builds with commercial intent.</h1>
          <p>
            This is where XDCoderz publishes selected tools, experiments, and
            infrastructure pieces that can be inspected, used, challenged, and
            matured into sharper products.
          </p>
        </div>
      </section>
      <OpenProductLab />
    </>
  );
}
