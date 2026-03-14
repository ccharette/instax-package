<script setup>
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
    isCollapsed: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <router-link v-slot="{ isActive }" :to="{ name }">
    <span
        :class="[
        'group text-md relative flex items-center gap-3 rounded-sm transition-all duration-300',
        isActive
          ? 'bg-primary-200 text-primary-600 dark:bg-primary-700 dark:text-primary-200'
          : 'text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45',
        isCollapsed ? 'aspect-square size-10 justify-center p-0' : 'px-3 py-2',
      ]"
        :title="isCollapsed ? label : ''"
    >
      <component
          :is="icon"
          :class="[
          'shrink-0 transition-all duration-300',
          isCollapsed ? 'size-5' : 'size-4 opacity-50',
        ]"
      />
      <span
          v-if="notification && isCollapsed"
          class="bg-primary-500 absolute top-2 right-2 h-2 w-2 rounded-full ring-2 ring-white dark:ring-neutral-800"
      ></span>
      <span
          v-if="!isCollapsed"
          :class="['grow whitespace-nowrap', isActive ? 'font-medium' : 'font-normal']"
      >
        {{ label }}
      </span>
      <span
          v-if="notification && !isCollapsed"
          :class="[
          'flex h-5 items-center justify-center rounded-sm px-2 text-xs',
          isActive
            ? 'bg-primary-300 dark:bg-primary-300 text-primary-800'
            : 'bg-neutral-200/80 text-neutral-500 group-hover:bg-neutral-300 dark:bg-neutral-500 dark:text-neutral-900 group-hover:dark:bg-neutral-500/75',
        ]"
      >
        {{ notification }}
      </span>
    </span>
    </router-link>
</template>
