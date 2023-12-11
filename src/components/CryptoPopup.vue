<template>
  <div
    class="w-screen h-screen overflow-hidden flex items-center justify-center absolute top-0 right-0 z-10 p-2"
  >
    <div
      class="bg-white md:w-[60%] h-[60%] rounded-lg border-black py-8 px-2 border md:p-20 relative container mx-auto z-20"
    >
      <button
        @click="$emit('popupClose', false)"
        class="bg-red-500 absolute top-0 right-0 md:w-10 md:h-10 w-6 h-6 custom-button"
      >
        x
      </button>
      <input
        placeholder="Search a cryptocurrency pair"
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
            id: coin.lastId,
            count: coin.ownedCount,
          }"
          :is="
            coin.uCoin == undefined || coin.uCoin == false
              ? coinComponent
              : ownedCoin
          "
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

const filterBySearch = computed(() => {
  return store.getters.getAllCoins.filter((coin) =>
    coin.symbol.toLocaleLowerCase().includes(inputVal.value.toLocaleLowerCase())
  );
});
</script>
