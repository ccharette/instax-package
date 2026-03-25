<script setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ButtonIcon } from '../components/ui';
import { useThemeStore } from "../stores";

const themeStore = useThemeStore();
const {isDark} = storeToRefs(themeStore);
const {toggleDarkMode} = themeStore;

const icon = computed(() => (isDark.value ? SunIcon : MoonIcon));
</script>

<template>
    <ButtonIcon
        class="inline-flex"
        aria-label="Toggle Dark Mode"
        @click="toggleDarkMode"
    >
        <component :is="icon" class="h-5 w-5 flex-none"/>
    </ButtonIcon>
</template>
