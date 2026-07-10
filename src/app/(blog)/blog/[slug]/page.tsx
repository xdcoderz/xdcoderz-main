import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { getAllBlogPosts, getBlogPost, getRelatedBlogPosts } from "@/features/blog/blog-utils";
import { AuthorBio } from "@/features/blog/components/AuthorBio";
import { BlogFaq, type BlogFaqItem } from "@/features/blog/components/BlogFaq";
import { BlogShareActions } from "@/features/blog/components/BlogShareActions";
import { MarkdownRenderer } from "@/features/blog/components/MarkdownRenderer";
import { ReadingProgressBar } from "@/features/blog/components/ReadingProgressBar";
import { RelatedPosts } from "@/features/blog/components/RelatedPosts";
import { WeeklyDigestRenderer } from "@/features/blog/components/WeeklyDigestRenderer";
import type { BlogPost, WeeklyMarketDigest } from "@/features/blog/types";
import { SubscriberCta } from "@/features/subscribers/components/SubscriberCta";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getGeneratedOgImageUrl(post: BlogPost) {
  return `${site.url}/api/og/blog/${post.slug}`;
}

function buildFaqItems(post: BlogPost, digest?: WeeklyMarketDigest): BlogFaqItem[] {
  if (digest) {
    return [
      {
        question: "What is this weekly market digest for?",
        answer:
          "It turns the week's important technology, business, and policy signals into practical context for Indian founders, operators, and weekend builders.",
      },
      {
        question: "How are stories selected?",
        answer: `Stories are selected for recency, global significance, concrete India relevance, and commercial usefulness across the ${digest.coverage.start} to ${digest.coverage.end} coverage window.`,
      },
      {
        question: "How should I use the Builder Opportunity sections?",
        answer:
          "Treat each opportunity as a first project brief. Copy it, validate the pain with a few target users, and only then turn the strongest idea into a weekend MVP.",
      },
      {
        question: "Does this replace full market research?",
        answer:
          "No. It is a sharp starting point for deciding what deserves deeper research, customer calls, and product experiments.",
      },
    ];
  }

  return [
    {
      question: `What is "${post.title}" about?`,
      answer: post.description,
    },
    {
      question: "Who should read this post?",
      answer:
        "It is written for founders, operators, and teams looking for practical software, automation, and product leverage.",
    },
    {
      question: "Can XDCoderz help implement this?",
      answer:
        "Yes. XDCoderz helps turn useful software ideas into focused products, internal tools, websites, and automations.",
    },
  ];
}

export function generateStaticParams() {
  if (!features.blog) {
    return [];
  }

  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || !features.blog) {
    return {
      title: "Blog",
    };
  }

  const url = `${site.url}${routes.blogPost(post.slug)}`;
  const images = [
    {
      url: getGeneratedOgImageUrl(post),
      width: 1200,
      height: 630,
      alt: post.title,
    },
  ];

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!features.blog) {
    notFound();
  }

  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${site.url}${routes.blogPost(post.slug)}`;
  const digest = post.format === "weekly-market-digest-v3" ? post.digest : undefined;
  const isDigest = Boolean(digest);
  const faqItems = buildFaqItems(post, digest);
  const relatedPosts = getRelatedBlogPosts(post.slug);
  const postImageUrl = getGeneratedOgImageUrl(post);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    image: postImageUrl,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.url}${routes.blog}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <article>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd, faqJsonLd]) }}
      />
      <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-14 sm:py-18">
        <div className={`mx-auto ${isDigest ? "max-w-5xl" : "max-w-3xl"}`}>
          <ButtonLink href={routes.blog} variant="ghost" className="-ml-5 mb-8">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to blog
          </ButtonLink>
          <p className="text-sm font-semibold uppercase text-neutral-500">
            {isDigest ? `Weekly market digest · ${post.date}` : post.category}
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold text-neutral-950 sm:text-5xl">
            {post.title}
          </h1>
          <p
            className={`mt-5 max-w-3xl text-lg leading-8 text-neutral-650 ${
              isDigest ? "digest-editorial text-xl sm:text-2xl" : ""
            }`}
          >
            {digest ? digest.subtitle : post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-neutral-600">
            <span>{post.author}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(post.date))}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
            {digest ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{digest.events.length} ranked events</span>
              </>
            ) : null}
          </div>
          <div className="mt-7">
            <BlogShareActions title={post.title} url={postUrl} />
          </div>
        </div>
      </header>

      <div className="px-6 py-12 sm:py-16">
        <div className={`mx-auto ${isDigest ? "max-w-5xl" : "max-w-3xl"}`}>
          {digest ? (
            <WeeklyDigestRenderer digest={digest} />
          ) : (
            <MarkdownRenderer content={post.content} />
          )}

          <AuthorBio author={post.author} />
          <BlogFaq items={faqItems} />
          <RelatedPosts posts={relatedPosts} />

          <div className="mt-14 border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Build the advantage
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
              Have a workflow that should not still be manual?
            </h2>
            <p className="mt-3 leading-7 text-neutral-650">
              XDCoderz can turn that bottleneck into a focused product, app, or
              automation that gives time back to the business.
            </p>
            <ButtonLink href={routes.contact} className="mt-5">
              Start a conversation
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>

      <section className="border-t border-neutral-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <SubscriberCta />
        </div>
      </section>
    </article>
  );
}
