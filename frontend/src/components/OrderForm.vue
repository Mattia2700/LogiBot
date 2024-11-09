<template>
  <div>
    <div class="mb-4 flex justify-between">
      <h2 class="text-center text-2xl">New Order</h2>
      <Button @click="close" text>
        <IconX class="h-6 w-6" />
      </Button>
    </div>

    <label for="maxAllowedPrice" class="mb-2 mr-2 text-lg"
      >Max allowed price</label
    >
    <InputNumber
      id="maxAllowedPrice"
      v-model.number="order.maxAllowedPrice"
      currency="EUR"
      :min="0"
      :max="6000"
      :step="50"
      class="mb-4 justify-center"
    />
    <Slider
      v-model="order.maxAllowedPrice"
      :max="3000"
      :min="1500"
      :step="10"
      class="mb-8"
    />
    <div class="mb-8 flex flex-row gap-4">
      <div class="flex flex-col">
        <InputText
          v-model="order.loadingAddress"
          class="mb-4 justify-center"
          placeholder="Enter the loading address"
        />

        <DatePicker
          id="loadingDate"
          placeholder="Enter the loading date"
          v-model="order.loadingDate"
          showIcon
          fluid
          iconDisplay="input"
        />
      </div>
      <div class="flex flex-col">
        <InputText
          v-model="order.unloadingAddress"
          class="mb-4 justify-center"
          placeholder="Enter the loading address"
        />

        <DatePicker
          id="loadingDate"
          placeholder="Enter the loading date"
          v-model="order.unloadingDate"
          showIcon
          fluid
          iconDisplay="input"
        />
      </div>
    </div>

    <div class="flex flex-col">
      <InputText
        v-model="order.goodsType"
        class="mb-4 justify-center"
        placeholder="Enter the goods type"
      />

      <Textarea
        v-model="order.notes"
        class="mb-4 max-h-32 min-h-11 justify-center"
        :rows="4"
        placeholder="Enter any notes"
      />
    </div>

    <!-- <Timeline
      :value="shippingDetails"
      layout="horizontal"
      align="alternate"
      class="my-6"
    >
      <template #content="slotProps">
        <div class="flex flex-col items-center">
          <span class="text-lg font-semibold">{{ slotProps.item.title }}</span>
          <span class="text-gray-600">{{ slotProps.item.address }}</span>
          <span class="text-gray-500">{{ slotProps.item.date }}</span>
        </div>
      </template>
    </Timeline> -->

    <Button class="mt-4" primary @click="sendOrder">Submit</Button>
  </div>
</template>

<script setup lang="ts">
import { Order } from '@store/models/order';
import { useOrderStore } from '@store/orderStore';
import { IconX } from '@tabler/icons-vue';
import { ref } from 'vue';

const orderStore = useOrderStore();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const order = ref<Order>({
  id: '',
  maxAllowedPrice: 2250,
  loadingAddress: '',
  unloadingAddress: '',
  loadingDate: null,
  unloadingDate: null,
  goodsType: '',
  notes: '',
});

// Computed property for the timeline items
// const shippingDetails = computed(() => [
//   {
//     title: 'Loading',
//     address: order.value.loadingAddress || 'Not specified',
//     date: order.value.loadingDate
//       ? order.value.loadingDate.toLocaleDateString()
//       : 'No date set',
//   },
//   {
//     title: 'Unloading',
//     address: order.value.unloadingAddress || 'Not specified',
//     date: order.value.unloadingDate
//       ? order.value.unloadingDate.toLocaleDateString()
//       : 'No date set',
//   },
// ]);

const close = () => {
  emit('close');
};

const sendOrder = async () => {
  await orderStore.createOrder(order.value);
};
</script>

<style scoped></style>
