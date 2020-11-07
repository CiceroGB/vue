<template>
  <v-app>
    <Topbar/>
    <Navbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';
import Topbar from './components/Topbar';

export default {
  name: 'App',

  components: {
    Navbar,
    Topbar
  },

  data: () => ({
    //
  }),
};
</script>
