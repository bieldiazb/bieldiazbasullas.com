import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function ProjectCard({ project, reversed }) {
  return (
    <article
      className={cn(
        "grid gap-10 items-center",
        "md:grid-cols-12",
        reversed && "md:flex-row-reverse"
      )}
    >
      {/* INFO */}
      <div className="md:col-span-5 space-y-6">
        <span className="text-xs tracking-widest text-muted-foreground">
          {project.type} · {project.year}
        </span>

        <h3 className="text-3xl md:text-5xl font-bold">
          {project.title}
        </h3>

        <p className="text-muted-foreground text-lg">
          {project.description}
        </p>

        <ul className="space-y-2">
          {project.highlights.map(h => (
            <li key={h} className="text-sm">
              → {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </div>

      {/* IMAGE */}
      <div className="md:col-span-7 relative group">
        <div className="
          rounded-3xl overflow-hidden
          border border-border/40
          bg-muted/20
        ">
          <img
            src={project.image}
            alt={project.title}
            className="
              w-full h-full object-cover
              transition-transform duration-500
              group-hover:scale-[1.04]
            "
          />
        </div>
      </div>
    </article>
  )
}
