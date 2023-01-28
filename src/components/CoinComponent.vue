<template>
  <div
    :class="{ 'py-1': !inInventory }"
    class="p-4 border flex rounded-lg justify-between w-full items-center relative"
  >
    <span v-if="inInventory"
      >{{ coinDetails.name }} <br />
      {{ coinDetails.price }}-{{ coinDetails.avgPrice }}
    </span>
    <span v-else> {{ coinDetails.name }}-{{ coinDetails.price }}</span>
    <div class="flex gap-12 items-center justify-between">
      <input
        class="rounded-md w-16 border-2 px-4 border-black relative h-8"
        type="number"
        name=""
        id=""
        min="0"
        v-model="count"
      />

      <div v-if="uCoin" class="gap-4 flex">
        <button
          :class="{ 'h-8': !inInventory }"
          class="custom-button bg-purple-300"
          @click="updateCoinFnc"
        >
          Update
        </button>
        <button
          :class="{ 'h-8': !inInventory }"
          class="custom-button bg-red-500"
          @click="removeCoinFnc"
        >
          Remove
        </button>
      </div>
      <div v-else class="flex">
        <button
          @click="addToInventoryFnc"
          :class="{ 'h-8': !inInventory }"
          class="md:px-20 md:py-2 px-12 rounded-md flex items-center justify-center bg-green-500"
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
  inInventory: { type: Boolean, default: false },
});

let count = ref(0);

watchEffect(() => (count.value = props.coinDetails.count));

function addToInventoryFnc() {
  store.commit("addToInventory", {
    id: props.coinDetails.id,
    count: count.value,
  });
}

function removeCoinFnc() {
  store.commit("removeCoin", props.coinDetails.id);
}

function updateCoinFnc() {
  if (count.value === 0) {
    removeCoinFnc();
  } else {
    store.commit("updateCoin", {
      id: props.coinDetails.id,
      count: count.value,
    });
  }
}
</script>
