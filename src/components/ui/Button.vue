<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'secondary', 'outline', 'ghost', 'danger'].includes(value),
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg', 'icon'].includes(value),
    },
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'button',
    },
});

const baseClasses = 'inline-flex items-center justify-center font-medium rounded-sm transition-all duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

const variantClasses = {
    primary: 'bg-primary-500 text-neutral-100 hover:not-disabled:bg-primary-600 dark:bg-primary-500/75 dark:hover:not-disabled:bg-primary-500',
    secondary: 'bg-neutral-200 text-neutral-600 hover:not-disabled:bg-neutral-300/75 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:not-disabled:bg-neutral-600',
    outline: 'border border-primary-500/75 hover:not-disabled:border-primary-500 text-primary-500 bg-primary-500/10 hover:not-disabled:bg-primary-400/20 dark:border-primary-500/75 dark:hover:not-disabled:border-primary-500 dark:text-primary-400 dark:bg-primary-500/10 dark:hover:not-disabled:bg-primary-400/20',
    ghost: 'btn-ghost',
    danger: 'bg-red-600 text-neutral-100 hover:not-disabled:bg-red-700/95 dark:bg-red-500 dark:hover:not-disabled:bg-red-400',
};

const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    icon: 'size-10',
};

const classes = computed(() => [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
]);
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="classes"
    >
        <svg
            v-if="loading"
            class="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        <span v-if="$slots.left" class="mr-2 -ml-1">
            <slot name="left" />
        </span>
        <slot :loading="loading" />
        <span v-if="$slots.right" class="ml-2 -mr-1">
            <slot name="right" />
        </span>
    </button>
</template>
