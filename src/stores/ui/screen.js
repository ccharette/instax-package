import { useEvents } from '@composables';
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useScreenStore = defineStore("screen", () => {
  const windowWidth = ref(typeof window !== "undefined" ? window.innerWidth : 1024);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  if (typeof window !== "undefined") {
    useEvents().listen("resize", updateWidth);
  }

  // Breakpoints (based on Tailwind defaults)
  const isSm = computed(() => windowWidth.value >= 640);
  const isMd = computed(() => windowWidth.value >= 768);
  const isLg = computed(() => windowWidth.value >= 1024);
  const isXl = computed(() => windowWidth.value >= 1280);
  const is2xl = computed(() => windowWidth.value >= 1536);

  // Helpers
  const isMobile = computed(() => windowWidth.value < 768);
  const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024);
  const isDesktop = computed(() => windowWidth.value >= 1024);

  return {
    windowWidth,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    isMobile,
    isTablet,
    isDesktop,
  };
});
