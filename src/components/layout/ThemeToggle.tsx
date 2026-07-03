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
      className="group grid size-10 place-items-center rounded-md border border-neutral-300 bg-white text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-sky-500/10 dark:hover:text-sky-200"
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
