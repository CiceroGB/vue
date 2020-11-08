<template>
  <div class="dashboard">
    <h1>dashboard</h1>
  </div>
</template>

<script>
export default {
  name: "myStore",
  data() {
    return {
      msg: "Welcome to my Vuex Store",
    };
  },
  computed: {
    lists() {
      return this.$store.getters.allLists;
    },
  },
  async mounted() {
    if (this.lists.length === 0) {
      await this.$store.dispatch("getLists");
    }
    console.log(this.lists);
  },
};
</script>


