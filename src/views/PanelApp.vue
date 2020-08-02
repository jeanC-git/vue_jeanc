<template>
  <v-row align="center" justify="center">
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn icon large target="_blank" v-on="on">
          <v-icon large>mdi-code-tags</v-icon>
        </v-btn>
      </template>
      <span>Source</span>
    </v-tooltip>
  </v-row>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    usuarioLogeado() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/");
    }
  },
  created() {},
};
</script>

<style>
</style>