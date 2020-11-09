<template>
  <v-container fluid tag="section">
    <section class="text-center">
      <h1 class="font-weight-light mb-2 headline">{{ $route.name }}</h1>
    </section>
    <v-card>
      <Table />
    </v-card>
    <br />
    <v-card>
      <Chart />
    </v-card>
  </v-container>
</template>

<script>
import Table from "../components/Table";
import Chart from "../components/Chart";
export default {
  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
  },
  components: {
    Table,
    Chart,
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }
  },
};
</script>


