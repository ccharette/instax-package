<script setup>
import ThemeToggle from "./ThemeToggle.vue";
import NotificationButton from "./NotificationButton.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import { ButtonIcon } from "../components/ui";
import { useThemeStore } from "../stores";

const themeStore = useThemeStore();
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;
</script>

<template>
    <nav
        class="sticky top-0 z-50 flex items-center justify-between bg-neutral-50 px-4 min-h-12 lg:min-h-16 dark:bg-neutral-800">
        <div class="flex items-center gap-2">
            <ButtonIcon
                v-if="isCollapsed"
                class="inline-flex lg:hidden"
                aria-label="Open Menu"
                @click="toggleCollapse"
            >
                <Bars3Icon class="size-6 flex-none"/>
            </ButtonIcon>
            <slot name="left"/>
        </div>
        <div class="flex items-center gap-4">
            <NotificationButton has-notifications />
            <ThemeToggle/>
            <slot name="right"/>
        </div>
    </nav>
</template>
