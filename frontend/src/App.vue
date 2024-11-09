<template>
  <div
    class="bg-bg-light dark:bg-dark-bg-light relative h-full w-full overflow-hidden
      bg-elevation-light-1 dark:bg-elevation-dark-0"
  >
    <!-- Barra di navigazione globale -->
    <Navbar />

    <!-- Contenuto dinamico basato sulla rotta -->
    <router-view class="h-[90%] overflow-y-auto overflow-x-hidden pb-12" />
    <!-- mt-20 h-full overflow-hidden pt-24 -->
    <!-- class="absolute inset-0 m-auto mt-40 box-border max-h-[90%] max-w-[90%] overflow-auto" -->

    <Toast />
  </div>
</template>

<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { onMounted, provide } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const toast = useToast();

// Define global functions to handle toast messages
const handleSuccess = (message: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
  });
};

const handleError = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message,
  });
};

// Provide these functions to child components
provide('handleSuccess', handleSuccess);
provide('handleError', handleError);

// Check the authentication status on component mount
onMounted(async () => {
  
});
</script>

<style scoped>
/* Stili di base per il layout */
</style>
