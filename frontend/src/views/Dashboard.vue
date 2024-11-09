<template>
  <div class="flex">
    <div class="h-[80%] w-1/4 bg-elevation-light-0 p-4">
      <h2 class="mb-4 text-2xl">Menu</h2>
      <ul>
        <li>
          <button
            @click="goTo('orders')"
            :class="{ 'bg-blue': currentRoute.startsWith('order') }"
            class="mb-2 w-full rounded-lg p-1 text-left text-xl"
          >
            Orders
          </button>
          <button
            @click="goTo('chats')"
            :class="{ 'bg-blue': currentRoute.startsWith('chat') }"
            class="mb-2 w-full rounded-lg p-2 text-left text-xl"
          >
            Chats
          </button>
        </li>
      </ul>
    </div>

    <div class="flex flex-1 flex-col">
      <div class="flex-1 overflow-auto p-4">
        <!-- Qui verrà mostrato il contenuto in base alla rotta -->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentRoute = computed(() => router.currentRoute.value.name as string);
console.log(currentRoute.value);

if (!currentRoute.value) router.push({ name: 'orders' });

const goTo = (routeName?: string) => {
  if (!routeName)
    router.push({ path: '/' }); // Naviga alla dashboard
  else router.push({ name: routeName }); // Naviga alla rotta
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
