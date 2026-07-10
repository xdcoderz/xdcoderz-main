import { ImageResponse } from "next/og";
import { getBlogPost } from "@/features/blog/blog-utils";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const imageSize = {
  width: 1200,
  height: 630,
};

type OgRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: OgRouteContext) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "XDCoderz Journal";
  const description = post?.description ?? site.description;
  const category = post?.category ?? "Blog";
  const issueDetail =
    post?.format === "weekly-market-digest-v3" && post.digest
      ? `${post.digest.events.length} ranked market events`
      : post?.readingTime;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f9fc",
          color: "#101827",
          padding: "72px",
          border: "1px solid #dbe3ee",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "32px" }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#075985" }}>{site.name}</div>
          <div style={{ fontSize: 24, color: "#526071" }}>{category}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <h1
            style={{
              margin: 0,
              maxWidth: "980px",
              fontSize: title.length > 72 ? 58 : 68,
              lineHeight: 1.05,
              letterSpacing: 0,
              fontWeight: 800,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "880px",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#334155",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #dbe3ee",
            paddingTop: "28px",
            fontSize: 24,
            color: "#526071",
          }}
        >
          <span>{site.tagline}</span>
          {issueDetail ? <span>{issueDetail}</span> : null}
        </div>
      </div>
    ),
    imageSize,
  );
}
