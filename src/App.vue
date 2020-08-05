<template>
  <v-app>
    <VAppBar v-if="loggedIn" />
    <v-main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
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
      if (
        this.$route.name == "Inicio" &&
        this.$store.state.auth.status.loggedIn
      ) {
        return false;
      } else if (
        this.$route.name != "Inicio" &&
        this.$store.state.auth.status.loggedIn == false
      ) {
        return false;
      } else if (
        this.$route.name == "Inicio" &&
        this.$store.state.auth.status.loggedIn == false
      ) {
        return false;
      } else if (
        this.$route.name != "Inicio" &&
        this.$store.state.auth.status.loggedIn
      ) {
        return true;
      }
      // return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>
<style >
/* TRANSITION SLIDE */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}

/* TRANSITION FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>