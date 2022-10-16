<template>
  <div class="transfer-money">
    <div class="customer-header d-flex align-items-center">
      <b-avatar
        :src="`https://i.pravatar.cc/150?img=${customer.id}`"
        size="6rem"
      />
      <div class="d-flex justify-center flex-column ml-4">
        <span>{{ customer.name }}</span>
        <span>${{ customer.balance }}</span>
      </div>
    </div>
    <div class="text-center mt-3">
      <b-button variant="success" v-b-toggle.moneyTransfer>
        Transfer Money
      </b-button>
    </div>
    <b-collapse id="moneyTransfer">
      <div class="mt-3">
        <span>Select Customer To Transfer Money To</span>
        <v-select
          ref="customerSelect"
          v-model="targetCustomer"
          dir="ltr"
          :options="customers"
          input-id="customer-select"
          :clearable="true"
          label="name"
        >
          <template v-slot:option="option">
            <b-avatar :src="`https://i.pravatar.cc/150?img=${option.id}`" />
            {{ option.name }}
          </template>
          <template v-slot:selected-option="option">
            <b-avatar :src="`https://i.pravatar.cc/150?img=${option.id}`" />
            <span class="ml-2">{{ option.name }}</span>
          </template>
        </v-select>
        <b-form-group class="mt-3">
          <label for="basic-password">Money Value to be Transferred</label>
          <b-input-group>
            <b-form-input
              v-model="money"
              placeholder="Enter Value"
              @keypress="isNumber"
            />
            <b-input-group-append>
              <b-button
                class="send-button"
                @click="toggleOverlay"
                :disabled="overlayShow"
              >
                <span v-if="overlayShow">
                  <b-spinner small :show="overlayShow" />
                </span>
                <span v-else> Send </span>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import {
  BButton,
  BCollapse,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormGroup,
  BAvatar,
  BSpinner,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import store from "@/store";

export default {
  name: "CustomerView",
  components: {
    BButton,
    BCollapse,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BFormGroup,
    BAvatar,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      overlayShow: false,
      money: "",
      timing: "",
    };
  },
  methods: {
    isNumber(event) {
      if (
        /^[a-z\s-=,.\\]*$/g.test(event.key) ||
        /^[A-Z]*$/g.test(event.key) ||
        event.shiftKey ||
        event.key === "/"
      ) {
        event.preventDefault();
      }
    },
    toggleOverlay() {
      // Check if user didn't choose target customer to send money to
      if (this.targetCustomer && this.targetCustomer.id) {
        // Check if input money value is valid
        if (!isNaN(Number(this.money))) {
          // Check if input money is greater than the customer balance
          if (+this.money > +this.customer.balance) {
            this.makeToast(
              "danger",
              `Please Enter Money Value Less than or Equal to $${this.customer.balance}`,
              "Error"
            );
            return;
          }
          this.overlayShow = true;

          axios
            .patch(
              `https://basic-bank-server.herokuapp.com/api/customers/${router.currentRoute.params.id}`,
              {
                source: router.currentRoute.params.id,
                target: this.targetCustomer.id,
                balance: +this.money,
              }
            )
            .then((result) => {
              console.log(result.data);
              this.makeToast("success", result.data.message, "Success");
              store.commit("app/SET_CUSTOMERS", result.data.customers);
              let transactions = store.state.app.transactions;
              transactions.push({
                id: transactions.length + 1,
                source: router.currentRoute.params.id,
                target: this.targetCustomer.id,
                money: +this.money,
              });
              store.commit("app/SET_TRANSACTIONS", transactions);
              this.timing = setTimeout(() => {
                this.overlayShow = false;
                this.$router.push({ name: "customers" });
              }, 3000);
            });
        } else {
          this.makeToast("danger", "Please Enter Valid Money Value", "Error");
        }
      } else {
        this.makeToast(
          "danger",
          "Please Choose Customer To Transfer Money To",
          "Error"
        );
      }
    },
    makeToast(variant = null, text, title) {
      this.$bvToast.toast(text, {
        title,
        variant,
        solid: true,
      });
    },
  },
  beforeDestroy() {
    clearTimeout(this.timing);
  },
  setup() {
    const customer = ref({});
    const customers = ref([]);
    const transferMoney = false;
    const targetCustomer = ref();
    axios
      .get(
        `https://basic-bank-server.herokuapp.com/api/customers/${router.currentRoute.params.id}`
      )
      .then((result) => {
        customer.value = result.data.customer[0];
        console.log(result.data);
      });

    customers.value = store.state.app.customers.filter(
      (customer) => customer.id !== +router.currentRoute.params.id
    );

    return {
      customer,
      customers,
      targetCustomer,
      transferMoney,
    };
  },
};
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
.transfer-money {
  padding: 30px;
}
.send-button {
  border-color: #7367f0 !important;
  background-color: #7367f0 !important;
}
.send-button:focus {
  background-color: #5e50ee !important;
}
</style>
