<template>
  <div>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list shaped dense v-if="items!==null">
        <v-list-item-group>
          <v-list-item v-for="(item, i) in routesHaveAccess" :key="i" :to="item.ruta">
            <v-list-item-icon>
              <v-icon v-text="item.icon ? item.icon :'mdi-clipboard-list' "></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.nombreModulo"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Google Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon @click="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      dialog: false,
      drawer: null,
      items: []
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    usuarioLogeado() {
      return this.$store.state.auth.user;
    },
    routesHaveAccess() {
      let vue = this;
      let permisos = vue.items.filter(i => i.nombreOperacion == "ver");
      return permisos;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    },
    getPermisos() {
      let vue = this;
      let permisos = JSON.parse(localStorage.getItem("user")).user.p;
      vue.items = permisos;
    }
  },
  created() {
    this.getPermisos();
  }
};
</script>

<style>
</style>