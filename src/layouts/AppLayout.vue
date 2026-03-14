<script setup>
defineProps({
  sidebarProps: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] bg-neutral-200/60 lg:grid-cols-[auto_1fr] dark:bg-neutral-900"
  >
    <slot name="sidebar">
      <slot name="sidebar-nav" v-bind="sidebarProps" />
    </slot>
    <slot name="navbar" />
    <main class="">
      <slot />
    </main>
  </div>
</template>
