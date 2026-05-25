import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const setMode = (mode) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return { theme, setTheme: setMode };
}
