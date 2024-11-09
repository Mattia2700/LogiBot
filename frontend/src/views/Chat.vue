<script setup lang="ts">

import {useChatStore} from "@store/chatStore.ts";
import {onMounted} from "vue";
import router from "@router";

const chatStore = useChatStore()

onMounted(() => {
  // localhost:8088/chat/66124
  chatStore.fetchChatsByChatId(
      router.currentRoute.value.params.id
  )
  console.log(chatStore.selectedChat);
});

</script>

<template>
  <div>
    <h1 class="text-3xl">Chat</h1>
<!-- check if property message exists on chatStore.selectedChat-->
    {{ chatStore.selectedChatMessages }}
<!--    <div-->
<!--        v-for="msg in chatStore.selectedChat.messages"-->
<!--    >-->
<!--      {{ msg }}-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>