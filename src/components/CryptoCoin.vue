<template>
  <div
    class="p-4 border flex rounded-lg justify-between w-full items-center relative"
  >
    <span> {{ coinDetails.name }}-{{ coinDetails.price }}</span>
    <div class="flex gap-12 items-center justify-between">
      <input
        class="rounded-md w-16 border-2 px-4 border-black relative h-8"
        type="number"
        name=""
        id=""
        min="0"
        v-model="count"
      />

      <div class="flex">
        <button
          @click="addToInventoryFnc"
          class="md:px-20 md:py-1 px-12 rounded-md flex items-center justify-center bg-green-500"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, watchEffect } from "vue";
import store from "@/store";
let props = defineProps({
  coinDetails: {
    type: Object,
    default() {
      return {
        name: "",
        price: null,
        avgPrice: null,
        id: -1,
        count: 1,
      };
    },
  },
  uCoin: {
    type: Boolean,
    default: false,
  },
});

let count = ref();

watchEffect(() => (count.value = props.coinDetails.count));

function addToInventoryFnc() {
  if (count.value != (0 || undefined))
    store.commit("addToInventory", {
      id: props.coinDetails.id,
      count: count.value,
    });
}
</script>
