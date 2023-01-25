<template>
  <div
    :class="{ 'py-1': !inInventory }"
    class="p-4 border flex rounded-lg justify-between w-full items-center relative"
  >
    <span v-if="inInventory"
      >BTC <br />
      12500-10300
    </span>
    <span v-else> BTC-12500</span>
    <div class="flex gap-12 items-center justify-between">
      <input
        class="rounded-md w-16 border-2 px-4 border-black relative h-8"
        type="number"
        name=""
        id=""
        value="1"
      />

      <div v-if="uCoin" class="gap-4 flex">
        <button
          :class="{ 'h-8': !inInventory }"
          class="custom-button bg-purple-300"
        >
          Update
        </button>
        <button
          :class="{ 'h-8': !inInventory }"
          class="custom-button bg-red-500"
        >
          Remove
        </button>
      </div>
      <div v-else class="flex">
        <button
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
import { defineProps } from "vue";

defineProps({
  uCoin: {
    type: Boolean,
    default: false,
  },
  inInventory: { type: Boolean, default: false },
});
</script>
