<script setup>
import { computed, ref } from 'vue';
import { useModalStepper } from '../../composables/useModalStepper';

const username = ref('');
const error = ref('');

const steps = computed(() => [
    {
        title: 'Account Type',
        content: 'Select the type of account you want to create.',
        canContinue: true,
    },
    {
        title: 'Username',
        content: 'Please enter a username.',
        canContinue: () => {
            if (username.value.length < 3) {
                error.value = 'Username must be at least 3 characters long.';
                return false;
            }
            error.value = '';
            return true;
        },
    },
    {
        title: 'Finish',
        content: 'You are all set!',
        isSuccess: true,
    }
]);

const { currentStep, currentStepIndex } = useModalStepper(steps);
</script>

<template>
    <div class="overflow-hidden relative min-h-[150px]">
        <Transition name="step-fade" mode="out-in">
            <div :key="currentStepIndex" class="space-y-4">
                <p class="text-neutral-600 dark:text-neutral-300">
                    {{ currentStep.content }}
                </p>

                <!-- Custom Step Logic -->
                <div v-if="currentStepIndex === 0" class="flex gap-4">
                    <button class="px-4 py-2 border rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">Personal</button>
                    <button class="px-4 py-2 border rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">Business</button>
                </div>

                <div v-if="currentStepIndex === 1" class="space-y-2">
                    <input 
                        v-model="username" 
                        type="text" 
                        placeholder="Enter username" 
                        class="w-full px-3 py-2 border rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
                    />
                    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
                </div>

                <div v-if="currentStep.isSuccess" class="flex justify-center py-4">
                    <div class="size-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
