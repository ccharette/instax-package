<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores";

const themeStore = useThemeStore();
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

</script>

<template>
  <div
    class="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] bg-neutral-200/60 lg:grid-cols-[auto_1fr] dark:bg-neutral-900"
  >
    <slot name="sidebar">
      <slot name="sidebar-nav" />
    </slot>
    <div class="flex flex-col min-h-screen">
      <slot 
          name="navbar" 
          v-bind="{ isCollapsed, onToggleCollapse: toggleCollapse }" 
      />
      <main class="flex-1 p-12">
        <slot />
      </main>
    </div>
  </div>
</template>
