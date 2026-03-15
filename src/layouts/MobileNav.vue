<script setup>
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { ButtonIcon } from '../components/ui';
import NavLink from "./NavLink.vue";

defineProps({
    linkGroups: {
        type: Array,
        required: true,
    },
});

const isOpen = ref(false);

const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <div class="lg:hidden">
        <ButtonIcon
            :aria-label="isOpen ? 'Close Menu' : 'Open Menu'"
            @click="toggleMenu"
        >
            <component :is="isOpen ? XMarkIcon : Bars3Icon" class="size-6 flex-none"/>
        </ButtonIcon>

        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="isOpen"
                     class="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm top-12 lg:top-16"
                     @click="isOpen = false"
                />
            </Transition>

            <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="-translate-y-full"
                enter-to-class="translate-y-0"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="translate-y-0"
                leave-to-class="-translate-y-full"
            >
                <!-- Menu Content -->
                <div
                    v-if="isOpen"
                    class="fixed inset-x-0 top-0 z-40 h-auto rounded-b-sm bg-neutral-50 p-4 pt-16 lg:pt-20 dark:bg-neutral-800"
                >
                    <nav class="max-h-[70vh] space-y-6 overflow-y-auto pb-4">
                        <div v-for="group in linkGroups" :key="group.name"
                             class="space-y-3">
                            <p class="text-sm font-semibold uppercase text-neutral-400">
                                {{ group.label }}</p>
                            <ul class="space-y-2">
                                <li v-for="link in group.links" :key="link.name">
                                    <NavLink
                                        :icon="link.icon"
                                        :label="link.label"
                                        :name="link.name"
                                        class="text-xl"
                                        @click="isOpen = false"
                                    />
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>
