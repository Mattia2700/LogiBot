import { defineStore } from 'pinia';
import {reactive, ref} from 'vue';
import { Order } from './models/order';

export const useOrderStore = defineStore('orderStore', () => {
  // reactive state
  const orders = ref<Order[]>([]);

  // actions
  async function fetchOrders() {
    const response = await fetch('http://localhost:3000/order');
    const data = await response.json();
    console.log(data);
    orders.value = data;
  }

  async function createOrder(order: Order) {
    await fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    await fetchOrders();
  }

  return {
    orders,
    fetchOrders,
    createOrder,
  };
});
