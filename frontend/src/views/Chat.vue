<script setup lang="ts">
import router from '@router';
import { useChatStore } from '@store/chatStore.ts';
import { ref } from 'vue';

const chatStore = useChatStore();
const newMessage = ref('');

const chatId = router.currentRoute.value.params.id.toString();
chatStore.loadSelectedChat(chatId);
// onMounted(() => {});

setInterval(() => {
  chatStore.fetchChatsByChatId(chatStore.selectedChat?.id!);
}, 5000);

function sendMessage() {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(newMessage.value);
    newMessage.value = '';
  }
}
</script>

<template>
  <div class="flex h-screen flex-col p-4">
    <h1 class="mb-4 text-3xl">
      Chat with {{ chatStore.selectedChat?.supplierId }}
    </h1>

    <!-- Area messaggi -->
    <div class="mb-20 flex flex-1 flex-col space-y-4 overflow-y-auto">
      <div
        v-for="(message, index) in chatStore.selectedChat?.messages"
        :key="index"
        :class="[
          'w-3/4 max-w-xs rounded-lg p-4',
          message.role === 'bot'
            ? 'bg-blue-100 self-start text-left'
            : 'bg-green-100 self-end text-right',
        ]"
      >
        <p class="text-sm font-semibold">
          {{ message.role === 'bot' ? 'Bot' : 'User' }}
        </p>
        <p class="text-base">{{ message.text }}</p>
      </div>
    </div>

    <!-- Barra di input -->
    <div
      class="bg-white fixed bottom-0 left-0 flex w-full items-center space-x-4 border-t p-4"
    >
      <InputText
        type="text"
        placeholder="Type a message..."
        class="flex-1 rounded-lg border p-2"
        v-model="newMessage"
      />
      <Button
        @click="sendMessage"
        class="bg-blue-500 text-white rounded-lg px-4 py-2"
      >
        Send
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
