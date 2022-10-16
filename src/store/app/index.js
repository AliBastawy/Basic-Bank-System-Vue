import axios from "axios";
// import store from "@/store";

export default {
  namespaced: true,
  state: {
    customers: [],
    transactions: [],
    enableTable: false,
  },
  getters: {},
  mutations: {
    SET_CUSTOMERS(state, value) {
      state.customers = value;
    },
    SET_TRANSACTIONS(state, value) {
      state.transactions = value;
    },
    SET_TABLE(state, value) {
      state.enableTable = value;
    },
  },
  actions: {
    callCustomers(state) {
      axios
        .get("https://basic-bank-server.herokuapp.com/api/customers")
        .then((result) => {
          state.commit("app/SET_CUSTOMERS", result.data.customers);
          // state.commit("app/SET_TABLE", true);
        });
    },
  },
};
