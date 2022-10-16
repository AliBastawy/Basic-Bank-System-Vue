<template>
  <div class="about text-center">
    <h1 class="mt-3">Transactions List</h1>
    <vue-good-table class="customers-table" :columns="columns" :rows="rows">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'source'">
          <b-avatar
            :src="`https://i.pravatar.cc/150?img=${props.row.source}`"
            size="4rem"
          />
          <span style="font-weight: bold">
            {{ getCustomer(props.row.source).name }}
          </span>
        </span>
        <span v-else-if="props.column.field === 'target'">
          <b-avatar
            :src="`https://i.pravatar.cc/150?img=${props.row.target}`"
            size="4rem"
          />
          <span style="font-weight: bold">
            {{ getCustomer(props.row.target).name }}
          </span>
        </span>
        <span v-else-if="props.column.field === 'money'">
          ${{ props.row.money }}
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import { ref } from "vue";
import store from "@/store";
import { BAvatar } from "bootstrap-vue";

export default {
  components: {
    VueGoodTable,
    BAvatar,
  },
  methods: {
    getCustomer(id) {
      return store.state.app.customers.filter(
        (customer) => customer.id === id
      )[0];
    },
  },
  setup() {
    const columns = ref([
      {
        label: "ID",
        field: "id",
        type: "number",
      },
      {
        label: "Source Customer",
        field: "source",
      },
      {
        label: "Target Customer",
        field: "target",
      },
      {
        label: "Money",
        field: "money",
      },
    ]);
    const rows = ref([]);
    rows.value = store.state.app.transactions;

    return {
      columns,
      rows,
    };
  },
};
</script>

<style>
a {
  color: black;
}
.customers-table {
  padding: 30px;
}
</style>
