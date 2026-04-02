<script setup>
import { NotificationButton, ThemeToggle, UserDropdown } from "./";
import { Button } from "../components/ui";
import { useThemeStore } from "../stores";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";

const themeStore = useThemeStore();

const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

defineProps({
    userDropdownLinks: {
        type: Array,
        default: () => []
    },
    user: {
        type: Object,
        default: null
    }
});

defineEmits(['logout', 'account-change', 'profile']);
</script>

<template>
    <nav
        class="sticky top-0 z-50 flex items-center justify-between bg-neutral-50 px-4 min-h-12 lg:min-h-16 dark:bg-neutral-800">
        <div class="flex items-center gap-2">
            <Button
                v-if="isCollapsed"
                variant="ghost"
                size="icon"
                class="inline-flex lg:hidden"
                aria-label="Open Menu"
                @click="toggleCollapse"
            >
                <Bars3Icon class="size-6 flex-none"/>
            </Button>
            <slot name="left"/>
        </div>
        <div class="flex items-center gap-4">
            <NotificationButton has-notifications />
            <ThemeToggle/>
            <UserDropdown
                v-if="user"
                :link-groups="userDropdownLinks"
                :user="user"
                @logout="$emit('logout')"
            >
                <template #header>
                    <slot name="user-dropdown"/>
                </template>
            </UserDropdown>
        </div>
    </nav>
</template>
