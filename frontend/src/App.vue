<template>
  <div
    class="bg-bg-light dark:bg-dark-bg-light relative h-full w-full overflow-hidden
      bg-elevation-light-1 dark:bg-elevation-dark-0"
  >
    <!-- Barra di navigazione globale -->
    <Navbar />

    <!-- Contenuto dinamico basato sulla rotta -->
    <router-view class="h-[90%] overflow-y-auto overflow-x-hidden p-6 pb-12" />

    <Toast />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@components/Navbar.vue';
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

// Check the authentication status on component mount
onMounted(async () => {});
</script>

<style scoped>
/* Stili di base per il layout */
</style>
