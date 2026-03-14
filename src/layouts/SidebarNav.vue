<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { ButtonIcon } from "../components";
import NavLink from "./NavLink.vue";

const props = defineProps({
    linkGroups: {
        type: Array,
        required: true,
    },
    isCollapsed: {
        type: Boolean,
        required: true,
    },
    headerTitle: {
        type: String,
        default: "Sidebar Header",
    },
    footerTitle: {
        type: String,
        default: "Sidebar Footer",
    },
});

const emit = defineEmits(["toggle-collapse"]);
</script>

<template>
    <nav
        :class="[isCollapsed ? 'w-16' : 'w-60']"
        class="flex h-full flex-col overflow-hidden bg-neutral-50 transition-[width] duration-300 lg:flex dark:bg-neutral-800"
    >
        <header class="flex items-center justify-between bg-neutral-600 p-4 dark:bg-neutral-800">
            <!-- Sidebar Header Content -->
            <span
                v-if="!isCollapsed"
                class="text-lg font-bold whitespace-nowrap text-white"
            >
                {{ headerTitle }}
            </span>
            <ButtonIcon
                :aria-label="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
                @click="emit('toggle-collapse')"
            >
                <component
                    :is="isCollapsed ? ChevronRightIcon : ChevronLeftIcon"
                    class="size-5 flex-none"/>
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
                    v-if="!isCollapsed && group.label"
                    class="px-2 text-xs font-semibold text-neutral-400/75 uppercase"
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
                        />
                    </li>
                </ul>
            </div>
        </section>
        <footer
            class="flex flex-col gap-4 overflow-hidden bg-neutral-800 p-4 dark:bg-black">
            <!-- Sidebar Footer Content -->
            <div class="flex items-center justify-between">
                <span v-if="!isCollapsed"
                      class="text-sm whitespace-nowrap text-neutral-400"
                >
                    {{ footerTitle }}
                </span>
            </div>
        </footer>
    </nav>
</template>
