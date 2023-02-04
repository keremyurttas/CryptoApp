<template>
  <div class="h-screen w-screen container mx-auto py-4 md:py-20">
    <loader-component v-if="store.state.isLoading"></loader-component>
    <popup-component
      @popup-close="popupClose($event)"
      v-if="popupDisplay"
    ></popup-component>

    <div class="flex gap-4 w-full border-gray-500 border-b-2 py-4 text-white">
      <button @click="popupDisplay = true" class="custom-button bg-blue-600">
        Add / Update
      </button>
      <button @click="fetchData" class="custom-button bg-blue-600">
        Refresh
      </button>
    </div>
    <div class="md:flex justify-between pt-16 h-[85%] space-y-10 md:space-y-0">
      <div
        v-if="getInventory.length == 0"
        class="md:w-[50%] md:pr-16 space-y-3 overflow-auto"
      >
        <owned-coin-skeleton></owned-coin-skeleton>
        <owned-coin-skeleton></owned-coin-skeleton>
        <owned-coin-skeleton></owned-coin-skeleton>
        <owned-coin-skeleton></owned-coin-skeleton>
      </div>
      <div v-else class="md:w-[50%] md:pr-16 space-y-3 overflow-auto">
        <owned-coin
          :coinDetails="coin"
          v-for="(coin, i) in getInventory"
          :key="i"
          :inInventory="true"
        ></owned-coin>
      </div>
      <div class="md:block hidden w-0.5 h-full bg-gray-500"></div>
      <div
        class="flex items-center justify-center md:w-[50%] bg-gray-200 relative"
        v-if="getChartDetails.names.length == 0"
      >
        <chart-skeleton-component
          class=""
          v-if="getChartDetails.names.length == 0"
        ></chart-skeleton-component>
      </div>
      <div
        class="flex items-center justify-center md:w-[50%] bg-gray-200 relative"
        v-else
      >
        <chart-component :chartDetails="getChartDetails"></chart-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import popupComponent from "./CryptoPopup.vue";
import chartComponent from "./CryptoChart.vue";
import ownedCoin from "./OwnedCoin.vue";
import ownedCoinSkeleton from "./OwnedCoinSkeleton.vue";
import chartSkeletonComponent from "./ChartSkeleton.vue";
import store from "../store";
import loaderComponent from "../loaders/LoaderComponent.vue";

let popupDisplay = ref(false);

function popupClose(val) {
  popupDisplay.value = val;
}
function fetchData() {
  store.dispatch("fetchData");
}
const getInventory = computed(() => {
  console.log(store.state.isLoading);
  return store.getters.getInventory;
});
const getChartDetails = computed(() => {
  let chartDetails = {
    names: [],
    data: [],
  };
  getInventory.value.forEach((coin) => {
    chartDetails.names.push(coin.name);
    chartDetails.data.push(coin.price * coin.count);
  });

  return chartDetails;
});
setInterval(fetchData, 200000);
onMounted(() => {
  fetchData();
});
</script>
