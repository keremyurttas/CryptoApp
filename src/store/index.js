import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    allCoins: [],
    inventory: [],
  },
  getters: {},
  mutations: {
    // addToInventory(state, payload) {
    //   inventory.push()
    // },
  },
  actions: {
    test({ state }) {
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
