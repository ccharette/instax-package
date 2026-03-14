<script setup>
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { ButtonIcon } from '../components';
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
            aria-label="Toggle Menu"
            @click="toggleMenu"
        >
            <Bars3Icon class="size-6 flex-none"/>
        </ButtonIcon>

        <div v-if="isOpen"
             class="fixed inset-0 z-50">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm"
                 @click="isOpen = false"/>

            <!-- Menu Content -->
            <div
                class="fixed inset-x-0 top-0 h-auto bg-neutral-50 dark:bg-neutral-900 rounded-b-sm"
            >
                <div class="flex items-center justify-end min-h-12 px-4">
                    <ButtonIcon
                        aria-label="Close Menu"
                        @click="toggleMenu"
                    >
                        <XMarkIcon class="size-6 flex-none"/>
                    </ButtonIcon>
                </div>

                <nav class="max-h-[70vh] space-y-6 overflow-y-auto p-4">
                    <div v-for="group in linkGroups" :key="group.name"
                         class="space-y-3">
                        <p class="text-sm font-semibold text-neutral-400 uppercase">
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
        </div>
    </div>
</template>
