<template>
  <div class="h-screen w-screen container mx-auto py-4 md:py-20">
    <!-- <Teleport to="#loader">
      <crypto-loader v-if="store.state.isLoading"></crypto-loader>
    </Teleport> -->

    <crypto-popup
      @popup-close="popupClose($event)"
      v-if="popupDisplay"
    ></crypto-popup>

    <div class="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
      <button
        @click="popupDisplay = true"
        class="custom-button bg-blue-600"
        :class="{ 'animate-pulse': store.state.inventory.length == 0 }"
      >
        Add / Update
      </button>
      <button @click="fetchData" class="custom-button bg-blue-600">
        Refresh
      </button>
    </div>
    <div class="md:flex justify-between pt-16 h-[85%] space-y-10 md:space-y-0">
      <inventory-side></inventory-side>
      <div class="md:block hidden w-0.5 h-full bg-gray-500"></div>
      <chart-side></chart-side>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CryptoPopup from "./CryptoPopup.vue";
import ChartSide from "./ChartSide.vue";
import store from "../store";
import InventorySide from "./InventorySide.vue";
// import CryptoLoader from "@/loaders/CryptoLoader.vue";
let popupDisplay = ref(false);

function popupClose(val) {
  popupDisplay.value = val;
}
function fetchData() {
  store.dispatch("fetchData");
}

setInterval(fetchData, 1000000);
onMounted(() => {
  fetchData();
});
</script>
