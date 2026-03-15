import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(
    (typeof window !== "undefined" && localStorage.getItem("theme") === "dark") ||
      (typeof window !== "undefined" && !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  const isCollapsed = ref(typeof window !== "undefined" && localStorage.getItem("isCollapsed") === "true");

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
  };

  const toggleCollapse = (force) => {
    if (typeof force === "boolean") {
      isCollapsed.value = force;
    } else {
      isCollapsed.value = !isCollapsed.value;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("isCollapsed", isCollapsed.value);
    }
  };

  watchEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const app = document.getElementById("app");
    if (isDark.value) {
      root.classList.add("dark");
      app?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      app?.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return {
    isDark,
    toggleDarkMode,
    isCollapsed,
    toggleCollapse,
  };
});
