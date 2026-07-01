import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { getProduct, products } from "@/data/products";
import { routes } from "@/lib/routes";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products
    .filter((product) => product.slug !== "gridforge")
    .map((product) => ({
      slug: product.slug,
    }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Product",
    };
  }

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            {product.platformGroup}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            {product.description}
          </p>
        </div>
      </section>
      <Section title={product.tagline}>
        <div className="grid gap-4 md:grid-cols-2">
          {product.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
            >
              {highlight}
            </div>
          ))}
        </div>
        {product.downloads && (
          <div className="mt-8">
            <ButtonLink href={routes.productDownload(product.slug)}>
              View downloads
            </ButtonLink>
          </div>
        )}
      </Section>
    </>
  );
}
