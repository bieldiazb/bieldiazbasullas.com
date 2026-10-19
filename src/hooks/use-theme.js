import { useState } from "react";

// Tema clar/fosc amb la classe "dark" a <html>. index.html ja l'aplica
// abans del primer pintat a partir de localStorage("theme").
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const setMode = (mode) => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try { localStorage.setItem("theme", mode); } catch { /* sense storage */ }
    setTheme(mode);
  };

  return { theme, setTheme: setMode };
}
