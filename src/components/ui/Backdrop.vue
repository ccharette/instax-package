<script setup>
const isOpen = defineModel('isOpen', {
    type: Boolean,
    default: false,
});
</script>

<template>
    <div
        v-if="isOpen"
        class="bg-neutral-900/5 dark:bg-neutral-200/3 backdrop-blur-[1px] fixed inset-0 z-60"
        @click="isOpen = false"
    />
</template>