<template>
  <div>
    <h1 class="text-3xl">Chats</h1>
  </div>
</template>

<script setup lang="ts"></script>

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
