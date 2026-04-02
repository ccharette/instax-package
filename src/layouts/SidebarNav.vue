<script setup>
import NavLink from "./NavLink.vue";
import { Backdrop, Button } from "../components/ui";
import { useEvents } from '../composables';
import { useScreenStore, useThemeStore } from "../stores";
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

const themeStore = useThemeStore();
const screenStore = useScreenStore();

const { isLg } = storeToRefs(screenStore);
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

defineProps({
    linkGroups: {
        type: Array,
        required: true,
    },
});

const isOpen = computed({
    get: () => !isCollapsed.value,
    set: () => toggleCollapse(),
});

const selectLink = () => {
    console.debug('Link selected', isLg.value);
    if (!isLg.value) {
        setTimeout(() => {
            toggleCollapse(true);
        }, 100);
    }
};

useEvents().listen('resize', () => toggleCollapse(true));
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
    >
        <Backdrop v-model:isOpen="isOpen" class="lg:hidden" />
    </Transition>
    <nav
        :class="[isCollapsed ? 'w-0 lg:w-16' : 'w-60']"
        class="fixed inset-y-0 left-0 z-60 flex h-full flex-col overflow-hidden bg-neutral-50 transition-all duration-300 lg:relative lg:flex lg:z-40 dark:bg-neutral-800"
    >
        <header class="p-2 min-h-12 lg:min-h-16 flex items-center justify-between w-full">
            <!-- Sidebar Header Content -->
            <span
                class="block p-1 text-lg font-bold whitespace-nowrap text-neutral-900 dark:text-white"
                :class="{'lg:hidden': isCollapsed}"
            >
                
            </span>
            <Button
                variant="ghost"
                size="icon"
                class="hidden lg:inline-flex"
                :aria-label="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
                @click="toggleCollapse"
            >
                <component
                    :is="isCollapsed ? ChevronRightIcon : ChevronLeftIcon"
                    class="size-5 flex-none"
                />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                class="inline-flex lg:hidden"
                :aria-label="isCollapsed ? 'Open Menu' : 'Close Menu'"
                @click="toggleCollapse"
            >
                <component
                    :is="isCollapsed ? Bars3Icon : XMarkIcon"
                    class="size-6 flex-none"
                />
            </Button>
        </header>
        <section class="flex-1 space-y-6 overflow-y-auto p-2">
            <slot name="header" />
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
                            :is-collapsed="isCollapsed"
                            :label="link.label"
                            :name="link.name"
                            :notification="link.notification"
                            @select-link="selectLink"
                        />
                    </li>
                </ul>
            </div>
        </section>
        <footer class="flex flex-col gap-4 overflow-hidden p-2">
            <!-- Sidebar Footer Content -->
            <slot name="footer" :is-collapsed="isCollapsed"/>
            <div class="flex items-center justify-center">
                <span
                  class="text-xs uppercase whitespace-nowrap text-neutral-400 dark:text-neutral-500"
                  :class="{'lg:hidden': isCollapsed}"
                >
                    Instax 2026
                </span>
            </div>
        </footer>
    </nav>
</template>
