import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/routes";
import { getFeaturedOpenProjects, getOpenProjects } from "../lib/projects";
import { OpenProjectCard } from "./OpenProjectCard";

type OpenProductLabProps = {
  preview?: boolean;
};

export async function OpenProductLab({ preview = false }: OpenProductLabProps) {
  const projects = preview ? await getFeaturedOpenProjects() : await getOpenProjects();
  const heading = preview
    ? {
        kicker: "Open Product Lab",
        title: "Builds you can inspect before you trust the pitch.",
        copy: "Selected XDCoderz projects are built in public so founders, operators, and developers can inspect the work, follow the momentum, and see which tools are becoming real products.",
      }
    : {
        kicker: "Repository directory",
        title: "Open-source products and infrastructure in motion.",
        copy: "Each card combines XDCoderz editorial context with live GitHub signals where available. The business value stays readable even when a repository is private, early, or temporarily unreachable.",
      };

  return (
    <section id="lab" className={preview ? "open-lab-section" : "open-lab-section open-lab-section--page"}>
      <div className="home-container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="section-kicker">{heading.kicker}</p>
            <h2>{heading.title}</h2>
          </div>
          <div>
            <p>{heading.copy}</p>
            {preview && (
              <ButtonLink href={routes.lab} variant="ghost">
                Explore the full lab
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            )}
          </div>
        </div>

        <div className="open-lab-grid">
          {projects.map((project) => (
            <OpenProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
