<script setup>
import { computed } from 'vue';
import { NotificationIndicator } from "../components/ui";

const emit = defineEmits(['select-link']);

const props = defineProps({
    action: {
        type: Function,
        default: () => {},
    },
    icon: {
        type: Function,
        required: true,
    },
    isCollapsed: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: null,
    },
    notification: {
        type: Number,
        default: null,
    },
    red: {
        type: Boolean,
        default: false,
    }
});

const linkColor = computed(() => 
    props.red
        ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
        : 'text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45'
);

const selectLink = () => {
    props.action();
    
    emit('select-link');
};
</script>

<template>
    <router-link v-if="name" v-slot="{ isActive }" :to="{ name }" @click="selectLink">
        <span
            :class="[
                'group text-md relative flex items-center gap-3 rounded-sm transition-all duration-300',
                isActive
                  ? 'bg-primary-200 text-primary-600 dark:bg-primary-700 dark:text-primary-200'
                  : linkColor,
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
    <button v-else class="w-full cursor-pointer" @click="selectLink">
        <span
            :class="[
                'group text-md relative flex items-center gap-3 rounded-sm transition-all duration-300',
                linkColor,
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
              ring-class="ring-neutral-50 dark:ring-neutral-800"
          />
          <span
              v-if="!isCollapsed"
              :class="['whitespace-nowrap font-normal', { 'lg:hidden': isCollapsed }]"
          >
            {{ label }}
          </span>
          <NotificationIndicator
              v-if="notification && !isCollapsed"
              :count="notification"
              class="bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300 dark:bg-neutral-500 dark:text-neutral-900 group-hover:dark:bg-neutral-500/75"
          />
        </span>
    </button>
</template>
