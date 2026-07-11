import Link from "next/link";
import { routes } from "@/lib/routes";

type AuthorBioProps = {
  author: string;
};

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <aside className="article-author">
      <p>
        <strong>{author}</strong> publishes practical notes on
        software, automation, and business systems. Comments are intentionally closed here to keep the reading
        experience focused. For a thoughtful response,{" "}
        <Link href={routes.contact}>send a direct note</Link>
        .
      </p>
    </aside>
  );
}
