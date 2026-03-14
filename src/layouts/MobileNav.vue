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
            <Bars3Icon class="size-6"/>
        </ButtonIcon>

        <div v-if="isOpen"
             class="fixed inset-0 z-50 bg-white p-4 dark:bg-neutral-900">
            <div class="mb-8 flex justify-end">
                <ButtonIcon
                    aria-label="Close Menu"
                    @click="toggleMenu"
                >
                    <XMarkIcon class="size-6"/>
                </ButtonIcon>
            </div>

            <nav class="space-y-6 overflow-y-auto">
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
</template>
