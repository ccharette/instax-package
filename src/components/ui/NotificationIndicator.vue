<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../../stores/theme.js";

const themeStore = useThemeStore();
const { isInitialLoading } = storeToRefs(themeStore);

defineProps({
    dotOnly: {
        type: Boolean,
        default: false,
    },
    count: {
        type: Number,
        default: null,
    },
    ringClass: {
        type: String,
        default: "ring-neutral-50 dark:ring-neutral-800",
    },
});
</script>

<template>
    <div
        v-if="dotOnly"
        class="flex h-2 w-2"
    >
        <span 
            :class="[
                'absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75',
                isInitialLoading ? 'animate-ping' : ['ring-2', ringClass],
            ]"
        />
        <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"/>
    </div>
    <div
        v-else-if="count !== null"
        class="flex h-5 items-center justify-center rounded-sm px-2 text-xs font-medium"
    >
        {{ count }}
    </div>
</template>
