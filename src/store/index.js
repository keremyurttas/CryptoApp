import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    allCoins: [],
    inventory: [],
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
  },
  mutations: {
    addToInventory(state, payload) {
      state.inventory.push(payload);
      console.log(state.inventory);
    },
    removeCoin(state, payload) {
      let index = state.inventory.findIndex((coin) => coin.id == payload);
      state.inventory.splice(index, 1);
    },
  },
  actions: {
    fetchData({ state }) {
      axios.get("https://api2.binance.com/api/v3/ticker/24hr").then((r) => {
        r.data.forEach((coin) => {
          state.allCoins.push(coin);
        });
        console.log(state.allCoins);
        console.log(r.data.length);
      });
    },
  },
  modules: {},
});
