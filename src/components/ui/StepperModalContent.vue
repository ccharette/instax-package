<script setup>
import { computed } from 'vue';
import { useModalStepper } from '../../composables/useModalStepper';

const steps = computed(() => [
    {
        title: 'Step 1: Introduction',
        content: 'Welcome to the stepper modal. This is the first step. It has a lot of content to test the transition and height handling.',
        canContinue: true,
        canGoBack: false,
    },
    {
        title: 'Step 2: Configuration',
        content: 'Configure some settings here. You cannot go back to step 1. Notice the horizontal slide animation when you switch steps.',
        canContinue: () => {
            // Logic to check if we can proceed
            return true;
        },
        canGoBack: false,
    },
    {
        title: 'Step 3: Confirmation',
        content: 'Almost done! Review your choices and confirm. The stepper indicator at the top shows your progress through the workflow.',
        canContinue: true,
        canGoBack: true,
    },
    {
        title: 'Success!',
        content: 'Your configuration has been saved successfully. You can now close this window.',
        isSuccess: true,
        canContinue: true,
        canGoBack: false,
    }
]);

const { currentStep } = useModalStepper(steps);
</script>

<template>
    <div class="overflow-hidden relative min-h-[100px]">
        <Transition name="step-fade" mode="out-in">
            <div :key="currentStep.title">
                <div v-if="currentStep.isSuccess" class="flex flex-col items-center justify-center py-8 space-y-4">
                    <div class="size-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p class="text-center text-neutral-600 dark:text-neutral-300">
                        {{ currentStep.content }}
                    </p>
                </div>
                <div v-else class="space-y-4">
                    <p class="text-neutral-600 dark:text-neutral-300">
                        {{ currentStep.content }}
                    </p>
                </div>
            </div>
        </Transition>
    </div>
</template>
