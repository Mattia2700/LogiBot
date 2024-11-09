<template>
  <div class="h-full">
    <h1 class="mb-4 text-3xl">Orders</h1>
    <div>
      <div
        v-for="order in orderStore.orders"
        :key="order.id"
        class="flex flex-col gap-4 bg-elevation-light-0 p-6 sm:flex-row sm:items-center"
        v-if="orderStore.orders.length > 0"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <p class="text-lg font-semibold">Order ID: {{ order.id }}</p>
          <p class="text-lg font-semibold">
            From: {{ order.loadingAddress }} {{ order.loadingDate }}
          </p>
          <p class="text-lg font-semibold">
            To: {{ order.unloadingAddress }} {{ order.unloadingDate }}
          </p>
          <Button
            class="p-button-rounded p-button-warning"
            @click="orderDetail(order.id)"
            v-tooltip="'Visualizza dettagli ordine'"
          >
            <IconDirectionSign class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-lg">No orders found</p>
      </div>
    </div>

    <div class="mt-4 w-full text-right">
      <Button rounded @click="showModal = true">
        <IconPlus class="h-4 w-4" />
      </Button>
    </div>
  </div>

  <!-- Backdrop e Modale di Login -->
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 z-40 flex items-center justify-center bg-dark bg-opacity-50"
    >
      <transition name="pop">
        <div
          class="dark:bg-gray-800 w-full max-w-xl rounded-lg bg-light p-8 shadow-xl"
          v-show="showModal"
        >
          <OrderForm @close="closeModal" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import OrderForm from '@components/OrderForm.vue';
import { useOrderStore } from '@store/orderStore';
import { IconDirectionSign, IconPlus } from '@tabler/icons-vue';
import { reactive, ref, watch } from 'vue';
import { onMounted } from 'vue';

const orderStore = useOrderStore();

const orderDetail = (orderId: string) => {
  console.log(orderId);
};

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
};

// Fetch orders on component mount
onMounted(() => {
  orderStore.fetchOrders();
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
