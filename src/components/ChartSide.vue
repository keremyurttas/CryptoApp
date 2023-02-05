<template>
  <div class="md:w-[40%] md:h-full relative flex items-center justify-center">
    <component
      class="w-[80%] aspect-square rounded-full"
      :chartDetails="getChartDetails"
      :is="getChartDetails.names.length == 0 ? ChartSkeleton : CryptoChart"
    ></component>
  </div>
</template>
<script setup>
import CryptoChart from "./CryptoChart.vue";
import ChartSkeleton from "./ChartSkeleton.vue";
import { computed } from "vue";
import store from "@/store";
const getChartDetails = computed(() => {
  let chartDetails = {
    names: [],
    data: [],
  };
  //chart assignments

  store.state.inventory.forEach((coin) => {
    chartDetails.names.push(coin.name);
    chartDetails.data.push(coin.price * coin.count);
  });

  return chartDetails;
});
</script>
