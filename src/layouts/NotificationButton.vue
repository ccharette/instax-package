<script setup>
import { BellIcon } from "@heroicons/vue/24/outline";
import { ButtonIcon, NotificationIndicator } from "../components/ui";

defineProps({
    hasNotifications: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="relative">
        <ButtonIcon
            aria-label="View Notifications"
            class="inline-flex"
        >
            <BellIcon class="size-6 flex-none" />
        </ButtonIcon>
        <NotificationIndicator
            v-if="hasNotifications"
            dot-only
            class="absolute top-2.5 right-2.5"
            ring-class="ring-neutral-50 dark:ring-neutral-800"
        />
    </div>
</template>
