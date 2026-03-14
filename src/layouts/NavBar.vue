<script setup>
import ThemeToggle from "./ThemeToggle.vue";
</script>

<template>
    <nav
        class="flex items-center justify-between bg-neutral-50 px-4 min-h-12 lg:min-h-16 dark:bg-neutral-800">
        <div>
            <slot name="left"/>
        </div>
        <div class="flex items-center gap-4">
            <slot name="right"/>
            <ThemeToggle/>
        </div>
    </nav>
</template>
