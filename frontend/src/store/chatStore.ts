import { defineStore } from 'pinia';
import {reactive, ref} from 'vue';
import { Order } from './models/order';
import {Chat} from "@store/models/chat.ts";

export const useChatStore = defineStore('chatStore', () => {
    // reactive state
    const chats = ref<Chat[]>([]);

    // actions
    async function fetchChats() {
        const response = await fetch('http://localhost:3000/chats');
        const data = await response.json();
        console.log(data);
        chats.value = data;
    }

    // async function createChat(order: Chat) {
    //     await fetch('http://localhost:3000/order', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(order),
    //     });
    //     await fetchChats();
    // }

    return {
        chats,
        fetchChats,
        // createChat,
    };
});
