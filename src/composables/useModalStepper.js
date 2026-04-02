import { onMounted, watch } from 'vue';
import { useStepper } from './useStepper';
import { useModalStore } from '../stores/ui/modal';

export function useModalStepper(steps) {
    const modalStore = useModalStore();
    const stepper = useStepper(steps);

    const { 
        currentStep, 
        currentStepIndex, 
        totalSteps, 
        isFirstStep, 
        isLastStep, 
        next, 
        back,
        canContinue,
        canGoBack,
    } = stepper;

    const updateModalState = () => {
        // Basic labels
        modalStore.title = currentStep.value.title;
        modalStore.options.showStepper = !currentStep.value.isSuccess;
        modalStore.options.currentStepIndex = currentStepIndex.value;
        modalStore.options.totalSteps = totalSteps.value;
        
        // Button labels
        modalStore.options.confirmLabel = isLastStep.value ? 'Close' : 'Next';
        modalStore.options.cancelLabel = isFirstStep.value ? 'Cancel' : 'Back';
        
        // Success state handling
        if (currentStep.value.isSuccess) {
            modalStore.options.cancelLabel = ''; // Hide cancel/back on success
            modalStore.options.cancelDisabled = true;
        } else {
            modalStore.options.cancelDisabled = !canGoBack.value && !isFirstStep.value;
        }
        
        modalStore.options.confirmDisabled = !canContinue.value;
    };

    onMounted(() => {
        updateModalState();
        
        // Bind store actions to stepper methods
        modalStore.setOnConfirm(async () => {
            if (isLastStep.value) {
                modalStore.close('completed');
                return;
            }
            
            const isFinished = await next();
            if (isFinished) {
                modalStore.close('completed');
            } else {
                updateModalState();
            }
        });
        
        modalStore.setOnBack(async () => {
            await back();
            updateModalState();
        });
    });

    // Sync on step or validation changes
    watch([currentStepIndex, canContinue, canGoBack], () => {
        updateModalState();
    });

    return {
        ...stepper,
        updateModalState
    };
}
