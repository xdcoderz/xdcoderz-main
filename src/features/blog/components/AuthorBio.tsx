import Link from "next/link";
import { routes } from "@/lib/routes";

type AuthorBioProps = {
  author: string;
};

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <aside className="mt-14 border-t border-neutral-200 pt-8 text-sm leading-6 text-neutral-650">
      <p>
        <strong className="font-semibold text-neutral-950">{author}</strong> publishes practical notes on
        software, automation, and business systems. Comments are intentionally closed here to keep the reading
        experience focused. For a thoughtful response,{" "}
        <Link href={routes.contact} className="font-semibold text-sky-800 hover:text-sky-950">
          send a direct note
        </Link>
        .
      </p>
    </aside>
  );
}
