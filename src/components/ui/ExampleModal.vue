<script setup>
import { ref } from 'vue';
import { Button } from './index';

const props = defineProps({
    initialValue: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['close', 'confirm']);

const inputValue = ref(props.initialValue);

const handleCancel = () => {
    emit('close');
};

const handleConfirm = () => {
    emit('confirm', inputValue.value);
    emit('close');
};
</script>

<template>
    <div class="space-y-4">
        <div>
            <label for="example-input" class="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Example Label
            </label>
            <input
                id="example-input"
                v-model="inputValue"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                placeholder="Type something..."
            />
        </div>

        <p class="text-xs text-neutral-500 dark:text-neutral-400 italic">
            This modal is a custom component passed to the store. It can contain its own state and logic.
        </p>

        <div class="flex justify-end gap-2 pt-4">
            <Button variant="ghost" @click="handleCancel">Cancel</Button>
            <Button variant="primary" @click="handleConfirm">Save Changes</Button>
        </div>
    </div>
</template>
