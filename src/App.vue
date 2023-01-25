<template>
  <div class="h-screen w-screen container mx-auto py-4 md:py-20">
    <popup-component
      @popup-close="popupClose($event)"
      v-if="popupDisplay"
    ></popup-component>
    <div class="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
      <button @click="popupDisplay = true" class="custom-button bg-blue-600">
        Add / Update
      </button>
      <button @click="test" class="custom-button bg-blue-600">Refresh</button>
    </div>
    <div class="md:flex justify-between pt-16 h-[85%] space-y-10 md:space-y-0">
      <div class="md:w-[50%] md:pr-16 space-y-3">
        <!-- <owned-crypto :uCoin="true" :inInventory="true"></owned-crypto>
        <owned-crypto :uCoin="false" :inInventory="true"></owned-crypto> -->
      </div>
      <div class="md:block hidden w-0.5 h-full bg-gray-500"></div>
      <div class="flex items-center justify-center md:w-[50%] bg-gray-200">
        <div class="bg-gray-500 rounded-full w-96 h-96"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import ownedCrypto from "./components/OwnedCrypto.vue";
import popupComponent from "./components/PopupComponent.vue";
import store from "./store";
function popupClose(val) {
  popupDisplay.value = val;
}
function test() {
  store.dispatch("test");
}

let popupDisplay = ref(false);
</script>

<style></style>
