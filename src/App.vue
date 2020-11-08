<template>
  <v-app>
    <!-- <Topbar /> -->
    <Navbar />
    <v-main class="grey lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
// import Topbar from "./components/Topbar";

export default {
  name: "App",

  components: {
    // Topbar,
    Navbar,
  },

  data: () => ({}),
};
</script>
