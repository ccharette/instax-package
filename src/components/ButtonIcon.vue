<script setup>
</script>

<template>
    <button
        aria-label="Toggle Menu"
        class="size-10 flex items-center transition-all duration-300 justify-center rounded-sm cursor-pointer text-neutral-500 hover:text-neutral-600 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:text-neutral-200 dark:hover:bg-neutral-700/45"
    >
        <slot/>
    </button>
</template>