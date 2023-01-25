<template>
  <div
    class="w-screen h-screen overflow-hidden flex items-center justify-center absolute top-0 right-0 z-10"
  >
    <div
      class="bg-white md:w-[60%] h-[60%] rounded-lg border-black py-8 px-2 border md:p-20 relative container mx-auto"
    >
      <button
        @click="$emit('popupClose', false)"
        class="bg-red-500 absolute top-0 right-0 md:w-10 md:h-10 w-6 h-6 custom-button"
      >
        x
      </button>
      <input
        type="text"
        class="w-full rounded-lg p-4 mb-4 border border-black"
      />
      <div class="space-y-4">
        <owned-crypto :uCoin="true"></owned-crypto>
        <owned-crypto></owned-crypto>

        <owned-crypto></owned-crypto>
      </div>
    </div>
  </div>
</template>
<script setup>
import OwnedCrypto from "./OwnedCrypto.vue";
</script>
