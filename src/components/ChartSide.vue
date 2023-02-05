<template>
  <div class="md:w-[45%] md:h-full relative flex items-center justify-center">
    <component
      class="w-[70%] aspect-square rounded-full"
      :chartDetails="getChartDetails"
      :is="
        getChartDetails.names.length == 0
          ? chartSkeletonComponent
          : chartComponent
      "
    ></component>
  </div>
</template>
<script setup>
import chartComponent from "./CryptoChart.vue";
import chartSkeletonComponent from "./ChartSkeleton.vue";
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
