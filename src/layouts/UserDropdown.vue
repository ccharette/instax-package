<script setup>
import { NavLink } from './';
import { ref } from 'vue';
import { ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/vue/20/solid';

const props = defineProps({
    linkGroups: {
        type: Array,
        default: () => [],
    },
    user: {
        type: Object,
        default: () => ({
            name: 'User',
            email: 'user@example.com',
            avatar: null
        })
    },
});

const emit = defineEmits(['logout']);

const isOpen = ref(false);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const handleLogout = () => {
    isOpen.value = false;
    emit('logout');
};
</script>

<template>
    <div class="relative">
        <button
            class="group flex items-center space-x-2 rounded-sm p-1 cursor-pointer"
            @click="toggleDropdown"
        >
            <span class="flex size-8 items-center justify-center overflow-hidden">
                <img :src="user.avatar" :alt="user.name" class="size-full object-cover rounded-sm" />
            </span>
            <span class="rounded-sm h-9 px-2 flex items-center space-x-2 transition-colors group-hover:bg-neutral-200/45 dark:group-hover:bg-neutral-700/45">
                <span class="hidden text-sm font-medium text-neutral-500 dark:text-neutral-300 md:block">
                    {{ user.name }}
                </span>
                <ChevronDownIcon class="size-4 text-neutral-400 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" />
            </span>
        </button>

        <Teleport to="body">
            <div
                v-if="isOpen"
                class="fixed inset-0 z-[60]"
                @click="isOpen = false"
            />
            <div
                v-if="isOpen"
                class="fixed right-4 top-14 z-61 w-64 rounded-sm bg-neutral-50 shadow-sm ring-1 ring-neutral-100 dark:bg-neutral-800 dark:ring-neutral-700"
            >
                <div class="px-4 py-3">
                    <slot name="header" />
                </div>

                <div v-for="link in linkGroups" :key="link.name" class="py-1 px-2">
                    <NavLink
                        :icon="link.icon"
                        :label="link.label"
                        :name="link.name"
                    />
                </div>

                <div class="py-1 px-2 pb-2">
                    <NavLink
                        :icon="ArrowRightOnRectangleIcon"
                        label="Sign out"
                        red
                    />
                </div>
            </div>
        </Teleport>
    </div>
</template>
