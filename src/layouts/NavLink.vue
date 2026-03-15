<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "../stores/theme.js";
import { NotificationIndicator } from "../components/ui";

const themeStore = useThemeStore();
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

defineProps({
    icon: {
        type: Function,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    notification: {
        type: Number,
        default: null,
    },
});
const selectLink = () => {
    setTimeout(() => {
        toggleCollapse(true);
    }, 100);
};
</script>

<template>
    <router-link v-slot="{ isActive }" :to="{ name }" @click="selectLink">
    <span
        :class="[
            'group text-md relative flex items-center gap-3 rounded-sm transition-all duration-300',
            isActive
              ? 'bg-primary-200 text-primary-600 dark:bg-primary-700 dark:text-primary-200'
              : 'text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45',
            isCollapsed ? 'lg:aspect-square lg:size-10 lg:justify-center lg:p-0 p-2' : 'px-3 py-2',
        ]"
        :title="isCollapsed ? label : ''"
    >
      <component
          :is="icon"
          :class="[
          'shrink-0 transition-all duration-300',
          isCollapsed ? 'lg:size-5 size-4 opacity-50' : 'size-4 opacity-50',
        ]"
      />
      <NotificationIndicator
          v-if="notification && isCollapsed"
          dot-only
          class="max-lg:hidden absolute top-2 right-2"
          :ring-class="isActive ? 'ring-primary-200 dark:ring-primary-700' : 'ring-neutral-50 dark:ring-neutral-800'"
      />
      <span
          v-if="!isCollapsed"
          :class="['grow whitespace-nowrap', isActive ? 'font-medium' : 'font-normal', { 'lg:hidden': isCollapsed }]"
      >
        {{ label }}
      </span>
      <NotificationIndicator
          v-if="notification && !isCollapsed"
          :count="notification"
          :class="[
              isActive
                ? 'bg-primary-300 dark:bg-primary-300 text-primary-800'
                : 'bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300 dark:bg-neutral-500 dark:text-neutral-900 group-hover:dark:bg-neutral-500/75',
          ]"
      />
    </span>
    </router-link>
</template>
