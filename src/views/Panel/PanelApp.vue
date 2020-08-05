<template>
  <v-row align="center" justify="center">
    <ul style="width:50%">
      <li>{{usuarioLogeado.user.nombres}} {{usuarioLogeado.user.apellidos}}</li>
      <li>{{usuarioLogeado.user.email}}</li>
      <li>{{usuarioLogeado.user.token}}</li>
    </ul>
    {{redirectIfNotAllowed}}
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
  },
  mounted() {
    if (!this.usuarioLogeado) {
      this.$router.push("/");
    }
  },
  methods: {
    swal(title, type, timer, position, showClass, hideClass) {
      let vue = this;
      const Toast = vue.$swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        showClass: {
          popup: showClass,
        },
        hideClass: {
          popup: hideClass,
        },
        onOpen: (toast) => {
          toast.addEventListener("mouseenter", vue.$swal.stopTimer);
          toast.addEventListener("mouseleave", vue.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: type,
        title:
          "<p class='font-sacramento' style='font-family: Arial, sans-serif'>" +
          title +
          "</p>",
      });
    },
  },
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
  },
};
</script>

<style>
</style>