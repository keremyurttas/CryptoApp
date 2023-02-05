<template>
  <div class="lg:w-[45%] h-max md:h-full relative overflow-auto">
    <div
      v-if="store.state.inventory.length == 0"
      class="w-full space-y-3 overflow-auto"
    >
      <owned-coin-skeleton></owned-coin-skeleton>
      <owned-coin-skeleton></owned-coin-skeleton>
      <owned-coin-skeleton></owned-coin-skeleton>
      <owned-coin-skeleton></owned-coin-skeleton>
    </div>

    <div class="w-full space-y-3 overflow-auto">
      <owned-coin
        :coinDetails="coin"
        v-for="(coin, i) in store.state.inventory"
        :key="i"
        :inInventory="true"
      ></owned-coin>
    </div>
  </div>
</template>
<script setup>
import ownedCoin from "./OwnedCoin.vue";
import store from "@/store";
import OwnedCoinSkeleton from "./OwnedCoinSkeleton.vue";
</script>
