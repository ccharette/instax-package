<script setup>
defineProps({
    padding: {
        type: Boolean,
        default: true,
    },
})
</script>

<template>
    <div :class="['rounded-sm bg-neutral-50 dark:bg-neutral-800', padding ? 'p-4' : '']">
        <slot />
    </div>
</template>