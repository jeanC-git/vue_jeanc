<template>
  <v-app>
    <VAppBar v-if="loggedIn" />
    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import VAppBar from "./components/VAppBar";
export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    VAppBar,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>
