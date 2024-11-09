import { Chat } from '@store/models/chat.ts';
import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {
  // reactive state
  const chats = ref<Chat[]>([]);
  const selectedChat = ref<Chat>();

  // actions
  async function fetchChats() {
    const response = await axios.get<Chat[]>('http://localhost:3000/chats');
    chats.value = response.data;
  }

  async function fetchChatsByChatId(chatId: string) {
    const response = await axios.get<Chat>(
      'http://localhost:3000/chat/' + chatId
    );
    selectedChat.value = response.data;
  }

  async function loadSelectedChat(chatId: string) {
    selectedChat.value = chats.value.find((chat) => chat.id === chatId);
  }

  async function sendMessage(message: string) {
    await axios.post('http://localhost:3000/message', {
      chatId: selectedChat.value?.id,
      message: message,
    });
    // await fetchChatsByChatId(chatId);
    console.log('sendMessage', message);
  }

  return {
    chats,
    selectedChat,
    fetchChats,
    fetchChatsByChatId,
    loadSelectedChat,
    sendMessage,
  };
});
