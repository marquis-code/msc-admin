import { readonly, ref } from "vue";

export const useTheme = () => {
  const colorMode = ref("light");

  // Initialize theme from localStorage or default to light
  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      colorMode.value = saved || (prefersDark ? "dark" : "light");
      updateTheme(colorMode.value);
    }
  };

  // Update theme in DOM and localStorage
  const updateTheme = (theme: string) => {
    if (import.meta.client) {
      const html = document.documentElement;

      if (theme === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      localStorage.setItem("theme", theme);
      colorMode.value = theme;
    }
  };

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = colorMode.value === "light" ? "dark" : "light";
    updateTheme(newTheme);
  };

  // Set specific theme
  const setTheme = (theme: "light" | "dark") => {
    updateTheme(theme);
  };

  return {
    colorMode: readonly(colorMode),
    initTheme,
    toggleTheme,
    setTheme,
  };
};
