<template>
  <div>
    <h1 class="mb-4 text-3xl">Chats</h1>

    <div>
      <div
        v-for="chat in chatStore.chats"
        :key="chat.id"
        class="flex flex-col gap-4 bg-elevation-light-0 p-6 sm:flex-row sm:items-center"
        v-if="chatStore.chats.length > 0"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p class="text-lg font-semibold">Order ID: {{ chat.orderId }}</p>
          <p class="text-lg font-semibold">
            Supplier ID: {{ chat.supplierId }}
          </p>

          <Button
            class="p-button-rounded p-button-warning"
            @click="router.push(`/chat/${chat.id}`)"
            v-tooltip="'Visualizza dettagli ordine'"
          >
            <IconDirectionSign class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-lg">No chats found</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@store/chatStore.ts';
import { IconDirectionSign } from '@tabler/icons-vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const chatStore = useChatStore();

const router = useRouter();

onMounted(() => {
  chatStore.fetchChats();
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
