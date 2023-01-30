import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    allCoins: [],
    inventory: [],
    isLoading: false,
  },
  getters: {
    getInventory(state) {
      let detailedInventory = [];

      state.inventory.forEach((coin) => {
        for (let i = 0; i < state.allCoins.length; i++) {
          if (coin.id === state.allCoins[i].firstId) {
            detailedInventory.push({
              name: state.allCoins[i].symbol,
              price: state.allCoins[i].lastPrice,
              avgPrice: state.allCoins[i].weightedAvgPrice,
              id: state.allCoins[i].firstId,
              count: coin.count,
            });
            break;
          }
        }
      });

      return detailedInventory;
    },
    getAllCoins(state) {
      let coins = [];

      if (state.inventory.length == 0) {
        coins = state.allCoins;
      } else
        state.inventory.forEach((ownedCoin) => {
          state.allCoins.forEach((coin) => {
            if (ownedCoin.id == coin.firstId) {
              coin.uCoin = true;
              coin.ownedCount = ownedCoin.count;
            }
            coins.push(coin);
          });
        });

      return coins;
    },
  },
  mutations: {
    addToInventory(state, payload) {
      state.inventory.push(payload);
    },
    removeCoin(state, payload) {
      let inventoryIndex = state.inventory.findIndex(
        (coin) => coin.id == payload
      );
      state.inventory.splice(inventoryIndex, 1);
      let allCoinsIndex = state.allCoins.findIndex(
        (coin) => coin.firstId == payload
      );
      state.allCoins[allCoinsIndex].uCoin = false;
      state.allCoins[allCoinsIndex].ownedCount = undefined;
      state.isLoading = false;
    },
    updateCoin(state, payload) {
      let index = state.inventory.findIndex((coin) => coin.id == payload.id);
      state.inventory[index].count = payload.count;
      state.isLoading = false;
    },
  },
  actions: {
    fetchData({ state }) {
      state.isLoading = true;
      axios.get("https://api2.binance.com/api/v3/ticker/24hr").then((r) => {
        // let data = [];
        r.data.forEach((d, index) => {
          // if (d.firstId != -1) {
          //   data.push(d);
          // }
          if (d.openPrice == 0 && d.firstId == -1 && d.lastId == -1) {
            r.data.splice(index, 1);
          }
        });
        if (state.allCoins.length === r.data.length) {
          for (let i = 0; i < state.allCoins.length; i++) {
            state.allCoins[i].lastPrice = r.data[i].lastPrice;
          }
        } else state.allCoins = r.data;

        state.isLoading = false;
      });
    },
  },
  modules: {},
});
