import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

export const useModalStore = defineStore('modal', () => {
    const isOpen = ref(false);
    const title = ref('');
    const message = ref('');
    const component = shallowRef(null);
    const componentProps = ref({});
    const options = ref({
        size: 'md',
        closeOnOutsideClick: true,
        showCloseButton: true,
        showFooter: true,
        currentStepIndex: 0,
        totalSteps: 0,
        showStepper: false,
    });
    const onClose = ref(null);
    const onConfirm = ref(null);
    const onBack = ref(null);

    const open = (payload) => {
        title.value = payload.title || '';
        message.value = payload.message || '';
        component.value = payload.component || null;
        componentProps.value = payload.props || {};
        options.value = {
            size: payload.size || 'md',
            closeOnOutsideClick: payload.closeOnOutsideClick ?? true,
            showCloseButton: payload.showCloseButton ?? true,
            showFooter: payload.showFooter ?? true,
            confirmLabel: payload.confirmLabel || 'Confirm',
            cancelLabel: payload.cancelLabel || 'Cancel',
            backLabel: payload.backLabel || 'Back',
            showBackButton: payload.showBackButton ?? false,
            confirmDisabled: payload.confirmDisabled ?? false,
            cancelDisabled: payload.cancelDisabled ?? false,
            backDisabled: payload.backDisabled ?? false,
            currentStepIndex: payload.currentStepIndex ?? 0,
            totalSteps: payload.totalSteps ?? 0,
            showStepper: payload.showStepper ?? false,
        };
        onClose.value = payload.onClose || null;
        onConfirm.value = payload.onConfirm || null;
        onBack.value = payload.onBack || null;
        isOpen.value = true;
    };

    const close = (data = null) => {
        isOpen.value = false;
        if (onClose.value) {
            onClose.value(data);
        }
        // Optional: Reset state after transition if needed
    };

    const confirm = (data = null) => {
        if (onConfirm.value) {
            onConfirm.value(data);
        } else {
            close(data);
        }
    };

    const back = (data = null) => {
        if (onBack.value) {
            onBack.value(data);
        }
    };

    const setOnConfirm = (callback) => { onConfirm.value = callback; };
    const setOnClose = (callback) => { onClose.value = callback; };
    const setOnBack = (callback) => { onBack.value = callback; };

    return {
        isOpen,
        title,
        message,
        component,
        componentProps,
        options,
        onClose,
        onConfirm,
        onBack,
        open,
        close,
        confirm,
        back,
        setOnConfirm,
        setOnClose,
        setOnBack,
    };
});
