<template>
  <v-row align="center" justify="center">
    <ul style="width:50%">
      <li>{{usuarioLogeado.user.nombres}} {{usuarioLogeado.user.apellidos}}</li>
      <li>{{usuarioLogeado.user.email}}</li>
      <li>{{usuarioLogeado.user.token}}</li>
    </ul>
    {{redirectIfNotAllowed}}
    <br />
    <hr />
    {{prueba}}
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
    redirectIfNotAllowed() {
      let vue = this;
      let authRequired = Object.keys(vue.$route.query).length;
      if (authRequired > 0) {
        vue.swal(
          `No tienes acceso a este módulo.`,
          "success",
          3500,
          "top-end",
          "animate__animated animate__fadeInRight",
          "animate__animated animate__fadeOutRight"
        );
        setTimeout(() => {
          if (this.$router.path != "/panel") {
            this.$router.push("/panel");
          }
        }, 3000);
      }
    },
    prueba() {
      return this.$store.state.prueba;
    }
  },
  mounted() {
    if (!this.usuarioLogeado) {
      this.$router.push("/");
    }
  },
  methods: {},
  created() {
    let vue = this;
    let authRequired = Object.keys(vue.$route.query).length;
    if (authRequired > 0) {
      vue.swal(
        `No tienes acceso a este módulo.`,
        "success",
        3500,
        "top-end",
        "animate__animated animate__fadeInRight",
        "animate__animated animate__fadeOutRight"
      );
      setTimeout(() => {
        if (this.$router.path != "/panel") {
          this.$router.push("/panel");
        }
      }, 3000);
    }
  }
};
</script>

<style>
</style>