import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { features } from "@/config/features";
import {
  getAllBlogPosts,
  getBlogPost,
  getRelatedBlogPosts,
  slugifyBlogTaxonomy,
} from "@/features/blog/blog-utils";
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
    <article className="journal-article">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleJsonLd, breadcrumbJsonLd, faqJsonLd]),
        }}
      />

      <header className="article-header">
        <div className="article-header__inner">
          <Link href={routes.blog} className="article-back-link">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to blog
          </Link>
          <p className="article-kicker">
            {isDigest ? `Weekly market digest / ${post.date}` : post.category}
          </p>
          <h1>{post.title}</h1>
          <p className="article-header__deck">
            {digest ? digest.subtitle : post.description}
          </p>
          <div className="article-header__meta">
            <span>{post.author}</span>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(post.date))}
            </time>
            <span>{post.readingTime}</span>
            {digest ? <span>{digest.events.length} ranked events</span> : null}
          </div>
          <nav aria-label="Article topics" className="article-header__tags">
            {post.tags.map((tag) => (
              <Link key={tag} href={routes.blogTag(slugifyBlogTaxonomy(tag))}>
                #{tag}
              </Link>
            ))}
          </nav>
          <div className="article-share">
            <BlogShareActions title={post.title} url={postUrl} />
          </div>
        </div>
      </header>

      <div className="article-content">
        <div
          className={`article-content__inner ${
            isDigest ? "article-content__inner--digest" : ""
          }`}
        >
          {digest ? (
            <WeeklyDigestRenderer digest={digest} />
          ) : (
            <MarkdownRenderer content={post.content} />
          )}

          <div className="article-afterword">
            <AuthorBio author={post.author} />
            <BlogFaq items={faqItems} />
            <RelatedPosts posts={relatedPosts} />

            <section className="article-cta">
              <p className="journal-section-label">Build the advantage</p>
              <h2>Have a workflow that should not still be manual?</h2>
              <p>
                XDCoderz can turn that bottleneck into a focused product, app, or automation that gives
                time back to the business.
              </p>
              <Link href={routes.contact}>
                Start a conversation
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </div>

      <section className="journal-subscribe">
        <div>
          <SubscriberCta />
        </div>
      </section>
    </article>
  );
}
