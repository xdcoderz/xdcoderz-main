import Link from "next/link";
import { Mail, Search } from "lucide-react";
import { getBlogCategories, slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";

export function BlogMasthead() {
  const categories = getBlogCategories().slice(0, 5);

  return (
    <header className="journal-masthead">
      <div className="journal-container">
        <div className="journal-masthead__utility">
          <span>Technology / Business / Builder intelligence</span>
          <div className="journal-masthead__actions">
            <Link href={routes.blogSearch} aria-label="Search XDCoderz Journal">
              <Search size={15} aria-hidden="true" />
              Search
            </Link>
            <a href="#journal-subscribe">
              <Mail size={15} aria-hidden="true" />
              Get the Friday Brief
            </a>
          </div>
        </div>

        <Link href={routes.blog} className="journal-masthead__brand">
          XDCoderz Journal
        </Link>

        <nav aria-label="Journal sections" className="journal-masthead__nav">
          <Link href={routes.blog}>Latest</Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={routes.blogCategory(slugifyBlogTaxonomy(category))}
            >
              {category}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
