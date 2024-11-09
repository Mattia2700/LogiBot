<template>
  <div>

    <div class="w-1/4 bg-elevation-light-1 p-4">
      <h2 class="mb-4 text-2xl">Researcher Dashboard Menu</h2>
      <ul>
        <li>
          <Button
            @click="goTo('dashboard')"
            :class="{ 'bg-primary': currentRoute === 'dashboard' }"
            class="w-full p-2 mb-2 rounded-lg text-left"
          >
            Dashboard
          </Button>
          <Button
            @click="goTo('chats')"
            :class="{ 'bg-primary': currentRoute === 'chats' }"
            class="w-full p-2 mb-2 rounded-lg text-left"
          >
            Chats
          </Button>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const currentRoute = computed(() => router.currentRoute.value.name as string);
console.log(currentRoute.value);

const goTo = (routeName?: string) => {
  if (!routeName)
    router.push({ path: "/" }); // Naviga alla dashboard
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
