<script setup>
import { computed, watch } from 'vue';
import { useModalStore } from '../../stores/ui/modal';
import { Backdrop, Button } from './index';

const modalStore = useModalStore();

const isOpen = computed(() => modalStore.isOpen);
const title = computed(() => modalStore.title);
const message = computed(() => modalStore.message);
const options = computed(() => modalStore.options);
const component = computed(() => modalStore.component);
const componentProps = computed(() => modalStore.componentProps);

const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full m-4',
};

const close = () => {
    modalStore.close();
};

const confirm = (data) => {
    modalStore.confirm(data);
};

const onOutsideClick = () => {
    if (options.value.closeOnOutsideClick) {
        close();
    }
};

// Prevent scrolling when modal is open
watch(isOpen, (value) => {
    if (value) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}, { immediate: true });
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-100 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none"
            >
                <Backdrop :is-open="true" @click="onOutsideClick" class="!z-0" />

                <div
                    class="relative w-full bg-white dark:bg-neutral-800 rounded-lg shadow-xl transform transition-all"
                    :class="sizeClasses[options.size]"
                >
                    <!-- Header -->
                    <div v-if="title || options.showCloseButton" class="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
                        <h3 v-if="title" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            {{ title }}
                        </h3>
                        <div v-else />

                        <Button
                            v-if="options.showCloseButton"
                            variant="ghost"
                            size="sm"
                            class="!p-1 rounded-full"
                            @click="close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <slot>
                            <div v-if="message" class="text-sm text-neutral-600 dark:text-neutral-300">
                                {{ message }}
                            </div>
                            <component
                                v-else-if="component"
                                :is="component"
                                v-bind="componentProps"
                                @close="close"
                                @confirm="confirm"
                            />
                        </slot>
                    </div>

                    <!-- Footer Slot -->
                    <div v-if="$slots.footer && options.showFooter" class="flex justify-end gap-2 p-4 border-t border-neutral-200 dark:border-neutral-700">
                        <slot name="footer" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
