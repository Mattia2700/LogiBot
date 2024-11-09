<template>
  <Toolbar class="m-1 !rounded-2xl !bg-primary !p-4">
    <!-- Logo e titolo -->
    <template #start>
      <router-link :to="{ path: '/' }">
        <img
          :src="logo"
          alt="Benvenuto"
          class="will-change-filter transition-filter relative z-10 h-auto w-14 max-w-full
            cursor-pointer stroke-dark p-1 transition-transform duration-300 ease-in-out
            hover:scale-110 hover:drop-shadow-[0_0_1.5em_rgba(255,255,255,0.8)]
            dark:hover:drop-shadow-[0_0_1.5em_rgba(46,204,113,0.5)]"
        />
      </router-link>
      <div class="ml-4 text-2xl text-on-primary dark:text-neutral-80">
        LogiBot
      </div>
    </template>

  
  </Toolbar>
</template>

<script setup lang="ts">
import logo from '@/assets/images/LogiBot_Logo.png';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();




</script>

<style scoped>
/* Stili personalizzati possono essere aggiunti qui se necessario */
</style>
