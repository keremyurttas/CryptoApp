<template>
  <div
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
      <div class="gap-4 flex">
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
  inInventory: { type: Boolean, default: false },
});
let count = ref(0);

watchEffect(() => (count.value = props.coinDetails.count));
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
