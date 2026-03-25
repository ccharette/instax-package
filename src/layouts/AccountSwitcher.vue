<script setup>
import { ChevronUpDownIcon } from '@heroicons/vue/24/solid';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { Dropdown } from '../components/ui';
import { useThemeStore } from '../stores';

const themeStore = useThemeStore();
const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

defineProps({
    accounts: {
        type: Array,
        default: () => [],
    },
    currentAccount: {
        type: Object,
        default: null,
    },
})

const emit = defineEmits(["account-change"]);

const isAccountSwitcherOpen = ref(false);

const toggleAccountSwitcher = () => {
    isAccountSwitcherOpen.value = !isAccountSwitcherOpen.value;
};

const selectAccount = (account) => {
    emit("account-change", account);
    isAccountSwitcherOpen.value = false;
    toggleCollapse(true);
};
</script>

<template>
    <div class="relative w-full">
        <button
            class="group flex w-full items-center gap-3 rounded-md p-1 transition-colors text-neutral-500 hover:bg-neutral-200/45 dark:text-neutral-300 dark:hover:bg-neutral-700/45"
            @click="toggleAccountSwitcher"
        >
            <span
                class="flex size-8 shrink-0 items-center justify-center rounded-md bg-neutral-200/80 text-sm font-bold text-neutral-500 dark:bg-neutral-500 dark:text-neutral-900 group-hover:bg-neutral-300 dark:group-hover:bg-neutral-500/75"
            >
                {{ currentAccount?.name?.charAt(0) || 'A' }}
            </span>
            <span v-if="!isCollapsed" class="flex flex-1 items-center justify-between overflow-hidden">
                <span class="truncate text-sm font-bold">
                    {{ currentAccount?.name || 'Select Account' }}
                </span>
                <ChevronUpDownIcon class="size-4 shrink-0 text-neutral-300"/>
            </span>
        </button>

        <!-- Account Dropdown -->
        <Teleport to="body">
            <div
                v-if="isAccountSwitcherOpen"
                class="fixed inset-0 z-[60]"
                @click="isAccountSwitcherOpen = false"
            />
            <Dropdown
                v-if="isAccountSwitcherOpen"
                class="fixed right-2 top-14 z-[61] w-56 space-y-1 p-1"
            >
                <button
                    v-for="account in accounts"
                    :key="account.id"
                    :class="[
                        account.id === currentAccount?.id
                            ? 'bg-neutral-100 dark:bg-neutral-700'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/50'
                    ]"
                    class="flex w-full items-center gap-3 rounded-sm p-2 text-left"
                    @click="selectAccount(account)"
                >
                    <div
                        class="flex size-6 shrink-0 items-center justify-center rounded-sm bg-neutral-100 text-xs font-bold text-neutral-800 dark:bg-neutral-600 dark:text-neutral-100"
                    >
                        {{ account.name?.charAt(0) }}
                    </div>
                    <span class="truncate text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        {{ account.name }}
                    </span>
                </button>
            </Dropdown>
        </Teleport>
    </div>
</template>