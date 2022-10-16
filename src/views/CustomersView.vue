<template>
  <div class="about text-center">
    <h1 class="mt-3">Customers List</h1>
    <vue-good-table class="customers-table" :columns="columns" :rows="rows">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'name'">
          <router-link :to="{ name: 'customer', params: { id: props.row.id } }">
            <b-avatar
              :src="`https://i.pravatar.cc/150?img=${props.row.id}`"
              size="4rem"
            />
            <span style="font-weight: bold">
              {{ props.row.name }}
            </span>
          </router-link>
        </span>
        <span v-else-if="props.column.field === 'balance'">
          ${{ props.row.balance }}
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
  mounted() {
    this.rows = store.state.app.customers;
  },
  setup() {
    const columns = ref([
      {
        label: "ID",
        field: "id",
        type: "number",
      },
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Email",
        field: "email",
      },
      {
        label: "Balance",
        field: "balance",
      },
    ]);
    const rows = ref([]);

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
