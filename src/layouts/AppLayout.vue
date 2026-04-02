<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore, useModalStore } from "../stores";
import { Modal, Button, ExampleModal } from "../components/ui";

const themeStore = useThemeStore();
const modalStore = useModalStore();

const { isCollapsed } = storeToRefs(themeStore);
const { toggleCollapse } = themeStore;

const openExampleModal = () => {
  modalStore.open({
    title: 'Confirm Exit',
    message: 'Are you sure you want to leave? All your progress will be lost.',
    size: 'sm',
    onConfirm: () => {
      console.log('User confirmed leaving');
      alert('Action confirmed!');
    },
    onClose: () => {
      console.log('Modal closed');
    }
  });
};

const openCustomContentModal = () => {
  modalStore.open({
    title: 'Custom Content Modal',
    component: ExampleModal,
    props: {
      initialValue: 'Default Text',
    },
    size: 'md',
    showFooter: false,
  });
};
</script>

<template>
  <div
    class="grid min-h-screen grid-cols-1 grid-rows-[auto_1fr] bg-neutral-200/60 lg:grid-cols-[auto_1fr] dark:bg-neutral-900"
  >
    <slot name="sidebar">
      <slot name="sidebar-nav" />
    </slot>
    <div class="flex flex-col min-h-screen">
      <slot 
          name="navbar" 
          v-bind="{ isCollapsed, onToggleCollapse: toggleCollapse }" 
      />
      <main class="flex-1 p-12">
        <slot />
        
        <!-- Example Modal Triggers -->
        <div class="mt-8 pt-8 border-t border-neutral-300 dark:border-neutral-700 flex gap-4">
          <div>
            <p class="mb-4 text-sm italic">Example of message modal:</p>
            <Button variant="outline" @click="openExampleModal">
              Open Sample Modal
            </Button>
          </div>
          <div>
            <p class="mb-4 text-sm italic">Example of custom component modal:</p>
            <Button variant="outline" @click="openCustomContentModal">
              Open Custom Content Modal
            </Button>
          </div>
        </div>
      </main>
    </div>
    
    <!-- Global Modal Component -->
    <Modal>
      <template #footer>
        <Button variant="ghost" @click="modalStore.close()">Cancel</Button>
        <Button variant="danger" @click="modalStore.confirm()">Leave</Button>
      </template>
    </Modal>
  </div>
</template>
