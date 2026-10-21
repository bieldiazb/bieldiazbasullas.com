import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// El build fa tres passos (package.json → "build"):
//   1. vite build                         → app del navegador a dist/
//   2. vite build --ssr src/entry-server  → renderitzador a dist-ssr/
//   3. node scripts/prerender.mjs         → un HTML estàtic per pàgina i idioma
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // S'empaqueta tot (gsap, lenis…) perquè el prerender corri a Node sense
    // problemes de mòduls ESM/CJS
    noExternal: true,
  },
  server: {
    port: 5175,
    allowedHosts: [
      "unmaterial-tanner-overeducatively.ngrok-free.dev",
    ],
  },
});
