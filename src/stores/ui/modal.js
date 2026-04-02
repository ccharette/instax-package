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
    });
    const onClose = ref(null);
    const onConfirm = ref(null);

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
        };
        onClose.value = payload.onClose || null;
        onConfirm.value = payload.onConfirm || null;
        isOpen.value = true;
    };

    const close = (data = null) => {
        if (onClose.value) {
            onClose.value(data);
        }
        isOpen.value = false;
        // Optional: Reset state after transition if needed
    };

    const confirm = (data = null) => {
        if (onConfirm.value) {
            onConfirm.value(data);
        }
        close(data);
    };

    return {
        isOpen,
        title,
        message,
        component,
        componentProps,
        options,
        onClose,
        onConfirm,
        open,
        close,
        confirm,
    };
});
