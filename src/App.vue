<template>
  <v-app>
    <Topbar />
    <Navbar />
    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";

export default {
  name: "App",

  components: {
    Topbar,
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
