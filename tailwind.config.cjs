/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        accent: "hsl(var(--accent-hsl))",
        "accent-foreground": "hsl(var(--foreground))",

        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // DESIGN.md
        canvas: "var(--canvas)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        graphite: "var(--graphite)",
        slate: "var(--slate)",
        stone: "var(--stone)",
        hairline: "var(--hairline)",
        "hairline-soft": "var(--hairline-soft)",
        "surface-cool": "var(--surface-cool)",
        scrim: "var(--scrim)",
        "footer-bg": "var(--footer)",
      },
      fontFamily: {
        sans: ["Switzer", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // DESIGN.md: xs 4 · sm 6 · md 8 · lg 16 · full
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "16px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
