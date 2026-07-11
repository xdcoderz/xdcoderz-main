"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("xdcoderz-theme", nextTheme);
  }

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className="site-icon-button group"
    >
      <Sun
        size={18}
        aria-hidden="true"
        className="hidden transition group-hover:rotate-12 dark:block"
      />
      <Moon
        size={18}
        aria-hidden="true"
        className="transition group-hover:-rotate-12 dark:hidden"
      />
    </button>
  );
}
