<template>
  <div class="md:w-[40%] md:h-full relative flex items-center justify-center">
    <component
      class="w-[80%] aspect-square rounded-full"
      :chartDetails="store.getters.getChartDetails"
      :is="
        store.getters.getChartDetails.data.length == 0
          ? ChartSkeleton
          : CryptoChart
      "
    ></component>
  </div>
</template>
<script setup>
import CryptoChart from "./CryptoChart.vue";
import ChartSkeleton from "./ChartSkeleton.vue";
import store from "@/store";
</script>
