"use client";

import { FormEvent, useEffect, useId, useState } from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import type { BlogComment } from "@/features/blog/comments";

type BlogCommentsProps = {
  slug: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function BlogComments({ slug }: BlogCommentsProps) {
  const nameId = useId();
  const bodyId = useId();
  const honeypotId = useId();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("Add a useful take, question, or counterpoint.");

  useEffect(() => {
    let ignore = false;

    async function loadComments() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/blog/comments?slug=${encodeURIComponent(slug)}`,
          {
            cache: "no-store",
          },
        );
        const result = (await response.json()) as {
          ok?: boolean;
          comments?: BlogComment[];
        };

        if (!ignore && response.ok && result.ok) {
          setComments(result.comments ?? []);
        }
      } catch {
        if (!ignore) {
          setComments([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadComments();

    return () => {
      ignore = true;
    };
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("Posting your comment...");

    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          slug,
          name: formData.get("name"),
          body: formData.get("body"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
        comment?: BlogComment;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Comment failed.");
      }

      if (result.comment) {
        setComments((current) => [...current, result.comment as BlogComment]);
      }

      setStatus("success");
      setMessage(result.message || "Comment posted.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Comments are not available right now. Try again shortly.",
      );
    }
  }

  return (
    <section className="blog-comments" aria-labelledby="blog-comments-title">
      <div className="blog-comments__header">
        <p className="journal-section-label">Discussion</p>
        <div>
          <h2 id="blog-comments-title">Builder comments</h2>
          <p>
            {comments.length === 0
              ? "No comments yet."
              : `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
          </p>
        </div>
      </div>

      <form className="blog-comments__form" onSubmit={handleSubmit}>
        <label htmlFor={nameId}>Name</label>
        <input
          id={nameId}
          name="name"
          type="text"
          maxLength={64}
          placeholder="Anonymous builder"
          autoComplete="name"
          disabled={status === "loading"}
        />

        <label htmlFor={bodyId}>Comment</label>
        <textarea
          id={bodyId}
          name="body"
          required
          minLength={8}
          maxLength={1200}
          rows={5}
          placeholder="What did this make you think about?"
          disabled={status === "loading"}
        />

        <label htmlFor={honeypotId} className="blog-comments__honeypot">
          Website
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <div className="blog-comments__actions">
          <p aria-live="polite">{message}</p>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Posting" : "Post comment"}
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </form>

      <div className="blog-comments__list" aria-live="polite">
        {isLoading ? (
          <p className="blog-comments__empty">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <article className="blog-comments__item" key={comment.id}>
              <header>
                <div className="blog-comments__avatar" aria-hidden="true">
                  <MessageSquare size={15} />
                </div>
                <div>
                  <h3>{comment.name}</h3>
                  <time dateTime={comment.createdAt}>
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(comment.createdAt))}
                  </time>
                </div>
              </header>
              <p>{comment.body}</p>
            </article>
          ))
        ) : (
          <p className="blog-comments__empty">
            Start the discussion with a useful take or question.
          </p>
        )}
      </div>
    </section>
  );
}
