import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
  };

  watchEffect(() => {
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
  };
});
