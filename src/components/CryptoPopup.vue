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
        v-model="inputVal"
      />

      <div class="space-y-4 overflow-auto h-[80%]">
        <component
          :key="i"
          v-for="(coin, i) in filterBySearch"
          :coinDetails="{
            name: coin.symbol,
            price: coin.lastPrice,
            avgPrice: coin.weightedAvgPrice,
            id: coin.firstId,
            count: coin.ownedCount,
          }"
          :is="componentGetter(coin.uCoin)"
        ></component>

        <!-- <owned-crypto></owned-crypto>

        <owned-crypto></owned-crypto> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import coinComponent from "./CryptoCoin.vue";
import ownedCoin from "./OwnedCoin.vue";
import store from "@/store";
import { computed, ref } from "vue";

let inputVal = ref("");

function componentGetter(uCoin) {
  if (uCoin == undefined || uCoin == false) return coinComponent;
  else return ownedCoin;
}

const filterBySearch = computed(() => {
  let searchResult = [];
  store.getters.getAllCoins.forEach((coin) => {
    if (coin.symbol.includes(inputVal.value.toUpperCase())) {
      searchResult.push(coin);
    }
  });
  return searchResult.slice(0, 50);
});
</script>
