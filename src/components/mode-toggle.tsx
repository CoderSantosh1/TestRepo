"use client";

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon } from "lucide-react";

export function ModeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed right-5 z-[10000000000] max-lg:bottom-2.5 lg:top-1/3">
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        type="button"
        className="flex h-10 w-10 p-2 items-center justify-center rounded-md border border-gray-800 text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 "
      >
        <Sun className="h-5 w-5 dark:hidden" />
        <Moon className="h-5 w-5 hidden dark:block" />
      </button>
    </div>
  );
}