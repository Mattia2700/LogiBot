<template>
  <div>
    <h1 class="text-3xl">Chats</h1>
    <div v-for="chat in chatStore.chats" :key="chat.id">
      <div @click="router.push(`/chat/${chat.id}`)">
        {{ chat.id }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useChatStore} from "@store/chatStore.ts";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const chatStore = useChatStore()

const router = useRouter()

onMounted(() => {
  chatStore.fetchChats()
});

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
  transition: transform 0.3s ease,
  opacity 0.3s ease;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
