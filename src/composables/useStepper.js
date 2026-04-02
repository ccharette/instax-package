import { ref, computed } from 'vue';

export function useStepper(steps) {
    const currentStepIndex = ref(0);
    const totalSteps = computed(() => steps.value?.length || 0);
    const currentStep = computed(() => steps.value[currentStepIndex.value]);

    const isFirstStep = computed(() => currentStepIndex.value === 0);
    const isLastStep = computed(() => currentStepIndex.value === totalSteps.value - 1);

    const canContinue = computed(() => {
        if (typeof currentStep.value?.canContinue === 'function') {
            return currentStep.value.canContinue();
        }
        return currentStep.value?.canContinue ?? true;
    });

    const canGoBack = computed(() => {
        if (typeof currentStep.value?.canGoBack === 'function') {
            return currentStep.value.canGoBack();
        }
        return currentStep.value?.canGoBack ?? true;
    });

    const next = async () => {
        if (isLastStep.value) return true; // Signal completion

        // Check for condition to continue
        const shouldContinue = typeof currentStep.value.canContinue === 'function' 
            ? await currentStep.value.canContinue() 
            : currentStep.value.canContinue;
        
        if (shouldContinue === false) return false;

        currentStepIndex.value++;
        return false;
    };

    const back = async () => {
        if (isFirstStep.value) return;

        // Check for condition to go back
        const shouldGoBack = typeof currentStep.value.canGoBack === 'function' 
            ? await currentStep.value.canGoBack() 
            : currentStep.value.canGoBack;

        if (shouldGoBack === false) return;

        currentStepIndex.value--;
    };

    const goTo = (index) => {
        if (index >= 0 && index < totalSteps.value) {
            currentStepIndex.value = index;
        }
    };

    return {
        currentStepIndex,
        totalSteps,
        currentStep,
        isFirstStep,
        isLastStep,
        next,
        back,
        goTo,
        canContinue,
        canGoBack,
    };
}
