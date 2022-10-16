<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark">
        <b-navbar-brand :to="{ name: 'home' }">MyBank</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item
            :class="{ 'd-none': !loadCustomers }"
            :to="{ name: 'customers' }"
          >
            View Customers
          </b-nav-item>
          <b-nav-item :class="{ 'd-none': loadCustomers }">
            <b-spinner small type="grow"></b-spinner>
            Loading Data...
          </b-nav-item>
          <b-nav-item
            :class="{ 'd-none': !loadCustomers }"
            :to="{ name: 'transactions' }"
          >
            Transactions
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavItem,
  BSpinner,
} from "bootstrap-vue";
import axios from "axios";
import store from "./store";
import { ref } from "vue";

export default {
  components: {
    BNavbar,
    BNavbarNav,
    BNavItem,
    BNavbarBrand,
    BSpinner,
  },
  setup() {
    const loadCustomers = ref(false);
    axios
      .get("https://basic-bank-server.herokuapp.com/api/customers")
      .then((result) => {
        store.commit("app/SET_CUSTOMERS", result.data.customers);
        store.commit("app/SET_TRANSACTIONS", result.data.transactions);
        loadCustomers.value = true;
      });

    return {
      loadCustomers,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

nav {
  padding: 30px;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  background-color: #4b4b4b !important;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
