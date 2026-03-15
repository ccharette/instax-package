<script setup>
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { ButtonIcon } from "../components/ui";
import { useThemeStore } from "../stores/theme.js";
import NavLink from "./NavLink.vue";

const themeStore = useThemeStore();
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

defineProps({
    linkGroups: {
        type: Array,
        required: true,
    },
    headerTitle: {
        type: String,
        default: "Sidebar Header",
    },
});
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
        <div
            v-if="!isCollapsed"
            class="fixed inset-0 z-[60] bg-neutral-900/50 backdrop-blur-sm lg:hidden"
            @click="toggleCollapse"
        />
    </Transition>
    <nav
        :class="[isCollapsed ? 'w-0 lg:w-16' : 'w-60']"
        class="fixed inset-y-0 left-0 z-[60] flex h-full flex-col overflow-hidden bg-neutral-50 transition-all duration-300 lg:relative lg:flex lg:z-40 dark:bg-neutral-800"
    >
        <header class="p-2 min-h-12 lg:min-h-16 flex items-center justify-between w-full">
            <!-- Sidebar Header Content -->
            <span
                class="block p-1 text-lg font-bold whitespace-nowrap text-neutral-900 dark:text-white"
                :class="{'lg:hidden': isCollapsed}"
            >
                {{ headerTitle }}
            </span>
            <ButtonIcon
                class="hidden lg:inline-flex"
                :aria-label="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
                @click="toggleCollapse"
            >
                <component
                    :is="isCollapsed ? ChevronRightIcon : ChevronLeftIcon"
                    class="size-5 flex-none"
                />
            </ButtonIcon>
            <ButtonIcon
                class="inline-flex lg:hidden"
                :aria-label="isCollapsed ? 'Open Menu' : 'Close Menu'"
                @click="toggleCollapse"
            >
                <component
                    :is="isCollapsed ? Bars3Icon : XMarkIcon"
                    class="size-6 flex-none"
                />
            </ButtonIcon>
        </header>
        <section class="flex-1 space-y-6 overflow-y-auto p-2">
            <!-- Growing Sidebar Middle Content -->
            <div
                v-for="group in linkGroups"
                :key="group.name"
                class="space-y-3 pb-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral-200 dark:[&:not(:last-child)]:border-neutral-700/75"
            >
                <p
                    class="px-2 text-xs font-semibold text-neutral-400/75 uppercase"
                    :class="{'lg:hidden': isCollapsed}"
                >
                    {{ group.label }}
                </p>
                <ul :class="['space-y-1', isCollapsed ? 'flex flex-col items-center' : '']">
                    <li v-for="link in group.links" :key="link.name">
                        <NavLink
                            :icon="link.icon"
                            :label="link.label"
                            :name="link.name"
                            :notification="link.notification"
                        />
                    </li>
                </ul>
            </div>
        </section>
        <footer class="flex flex-col gap-4 overflow-hidden p-2">
            <!-- Sidebar Footer Content -->
            <slot name="footer" :is-collapsed="isCollapsed"/>
            <div class="flex items-center justify-between">
                <span
                  class="text-xs whitespace-nowrap text-neutral-400 dark:text-neutral-500"
                  :class="{'lg:hidden': isCollapsed}"
                >
                    Instax 2026
                </span>
            </div>
        </footer>
    </nav>
</template>
