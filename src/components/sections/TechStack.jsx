import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
} from "react-icons/si"

const techs = [
  { name: "HTML",       icon: SiHtml5,      color: "#E34F26" },
  { name: "CSS",        icon: SiCss3,       color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React",      icon: SiReact,      color: "#61DAFB" },
]

export default function TechStack() {
  return (
    <div style={{ width: "100%" }}>
      {/* Full-width row — each tech separated by vertical hairlines */}
      <ul style={{
        display: "grid",
        gridTemplateColumns: `repeat(${techs.length}, 1fr)`,
        margin: 0,
        padding: 0,
        listStyle: "none",
        border: "1px solid hsl(var(--border) / 0.35)",
      }}>
        {techs.map(({ name, icon: Icon, color }, i) => (
          <li
            key={name}
            style={{
              borderRight: i < techs.length - 1 ? "1px solid hsl(var(--border) / 0.35)" : "none",
            }}
          >
            <a
              // href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "1.25rem 1.5rem",
                height: "100%",
                textDecoration: "none",
                color: "hsl(var(--foreground))",
                transition: "background 0.25s ease",
                gap: "1.5rem",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${color}10`
                e.currentTarget.querySelector(".tech-icon").style.color = color
                e.currentTarget.querySelector(".tech-name").style.opacity = "1"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.querySelector(".tech-icon").style.color = "hsl(var(--muted-foreground))"
                e.currentTarget.querySelector(".tech-name").style.opacity = "0.35"
              }}
            >
              {/* Icon */}
              <Icon
                className="tech-icon"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "hsl(var(--muted-foreground))",
                  transition: "color 0.25s ease",
                  flexShrink: 0,
                }}
              />

              {/* Name */}
              <span
                className="tech-name"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)",
                  letterSpacing: "0.06em",
                  color: "hsl(var(--foreground))",
                  opacity: 0.35,
                  transition: "opacity 0.25s ease",
                  lineHeight: 1,
                }}
              >
                {name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}