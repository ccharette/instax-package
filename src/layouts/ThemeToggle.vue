<script setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { Button } from '../components/ui';
import { useThemeStore } from "../stores";

const themeStore = useThemeStore();
const {isDark} = storeToRefs(themeStore);
const {toggleDarkMode} = themeStore;

const icon = computed(() => (isDark.value ? SunIcon : MoonIcon));
</script>

<template>
    <Button
        variant="ghost"
        size="icon"
        class="inline-flex"
        aria-label="Toggle Dark Mode"
        @click="toggleDarkMode"
    >
        <component :is="icon" class="h-5 w-5 flex-none"/>
    </Button>
</template>
