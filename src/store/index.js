import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    data: [],
    allCoins: [],
    inventory: [],
    isLoading: false,
  },
  getters: {
    getAllCoins(state) {
      state.allCoins = state.data.map((data) => ({
        ...data,
        ownedCount: state.inventory.find(
          (ownedCoin) => ownedCoin.name == data.symbol
        )
          ? state.inventory.find((ownedCoin) => ownedCoin.name == data.symbol)
              .count
          : 1,
        uCoin: Boolean(
          state.inventory.find((ownedCoin) => ownedCoin.name == data.symbol)
        ),
      }));
      return state.allCoins;
    },
    getChartDetails(state) {
      let chartDetails = {
        names: [],
        data: [],
      };
      state.inventory.forEach((coin) => {
        chartDetails.names.push(coin.name);
        chartDetails.data.push(coin.price * coin.count);
      });
      console.log(chartDetails);

      return chartDetails;
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
      state.isLoading = false;
    },
    updateCoin(state, payload) {
      let index = state.inventory.findIndex((coin) => coin.id == payload.id);
      state.inventory[index].count = payload.count;
      state.isLoading = false;
    },
    updateInventory(state) {
      state.inventory = state.inventory.map((ownedCoin) => ({
        ...ownedCoin,
        price: state.data.find((coin) => coin.symbol == ownedCoin.name)
          .lastPrice,
        avgPrice: state.data.find((coin) => coin.symbol == ownedCoin.name)
          .weightedAvgPrice,
      }));
    },
  },
  actions: {
    async fetchData({ state }) {
      state.isLoading = true;
      await axios
        .get("https://api2.binance.com/api/v3/ticker/24hr")
        .then((response) => {
          state.data = response.data.filter((coin) => coin.firstId != -1);
        });
      this.commit("updateInventory");
      state.isLoading = false;
    },
  },
  modules: {},
});
