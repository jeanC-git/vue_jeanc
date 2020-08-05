<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
      <v-data-table
        v-model="seleccionados"
        :headers="cabeceras"
        :items="recursos"
        item-key="id"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title
              style="word-break: break-word;"
              :style="($vuetify.breakpoint.xsOnly) ? 'font-size: calc(1em + 0.8vw)' : ''"
            >Asignar Permisos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select
              class="mt-5"
              style="width: unset;"
              label="Roles"
              :items="roles"
              item-value="id"
              item-text="nombreRol"
              v-model="data.rol_id"
              @change="cambiarPermisosXRol()"
            ></v-select>
          </v-toolbar>
        </template>
        <template v-slot:item.agregar="{ item }">
          <v-checkbox v-model="item.agregar"></v-checkbox>
        </template>
        <template v-slot:item.ver="{ item }">
          <v-checkbox v-model="item.ver"></v-checkbox>
        </template>
        <template v-slot:item.editar="{ item }">
          <v-checkbox v-model="item.editar"></v-checkbox>
        </template>
        <template v-slot:item.eliminar="{ item }">
          <v-checkbox v-model="item.eliminar"></v-checkbox>
        </template>
      </v-data-table>
      <div class="text-center pt-5">
        <v-btn :loading="btn.loading" :disabled="btn.disabled" @click="asignar()">Asignar</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      singleSelect: false,
      seleccionados: [],
      cabeceras: [
        {
          text: "Recurso",
          align: "start",
          sortable: true,
          value: "recurso"
        },
        { text: "Ver", value: "ver", sortable: false, align: "start" },
        { text: "Agregar", value: "agregar", sortable: false, align: "start" },
        { text: "Editar", value: "editar", sortable: false, align: "start" },
        {
          text: "Eliminar",
          value: "eliminar",
          sortable: false,
          align: "start"
        }
      ],
      recursos: [
        {
          recurso: "Panel",
          ver: true,
          agregar: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/panel"
        },
        {
          recurso: "Usuarios",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/usuarios"
        },
        {
          recurso: "Roles",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/roles"
        },
        {
          recurso: "Asignar permisos",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/asignarpermisos"
        }
      ],
      recursos_clean: [
        {
          recurso: "Panel",
          ver: true,
          agregar: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/panel"
        },
        {
          recurso: "Usuarios",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/usuarios"
        },
        {
          recurso: "Roles",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/roles"
        },
        {
          recurso: "Asignar permisos",
          agregar: false,
          ver: false,
          editar: false,
          eliminar: false,
          routeRecurso: "/asignarpermisos"
        }
      ],
      roles: [],
      data: {
        nombreRol: "",
        rol_id: null
      },
      btn: {
        loading: false,
        disable: false
      }
    };
  },
  created() {
    let vue = this;
    vue.getRoles();
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
          popup: showClass
        },
        hideClass: {
          popup: hideClass
        },
        onOpen: toast => {
          toast.addEventListener("mouseenter", vue.$swal.stopTimer);
          toast.addEventListener("mouseleave", vue.$swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: type,
        title:
          "<p class='font-sacramento' style='font-family: Arial, sans-serif'>" +
          title +
          "</p>"
      });
    },
    getRoles() {
      let vue = this;

      vue.$store.dispatch("administrador/getRoles").then(
        response => {
          vue.roles = response.data;
          if (vue.roles.length) {
            vue.data.rol_id = response.data[0].id;
            if (response.data[0].permisos) {
              vue.recursos = JSON.parse(response.data[0].permisos);
            }
          }
        },
        error => {
          if (error && error.response.data.msg && error.response.data.cod) {
            vue.swal(
              `Mensaje de sistema: ${error.response.data.msg}`,
              "warning",
              2500,
              "top",
              "animate__animated animate__fadeInDown",
              "animate__animated animate__fadeOut"
            );
            switch (error.response.data.cod) {
              case "100-00002":
                setTimeout(() => {
                  vue.logout();
                }, 3000);
                break;
            }
          }
        }
      );
    },
    asignar() {
      let vue = this;
      let data = {
        id: vue.data.rol_id,
        data: JSON.stringify(vue.recursos)
      };
      vue.$store.dispatch("administrador/asignarPermisos", data).then(
        response => {
          vue.swal(
            `${response.data.msg}`,
            "success",
            3500,
            "top-end",
            "animate__animated animate__fadeInRight",
            "animate__animated animate__fadeOutRight"
          );
          let index = vue.roles.findIndex(rol => rol.id == data.id);
          vue.roles[index].permisos = data.data;
        },
        error => {
          console.log(error.response);
        }
      );
    },
    cambiarPermisosXRol() {
      let vue = this;
      let index = vue.roles.findIndex(rol => rol.id == vue.data.rol_id);
      let permisos = vue.roles[index].permisos;
      if (!permisos) {
        vue.recursos = vue.recursos_clean;
      } else {
        vue.recursos = JSON.parse(permisos);
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    }
  }
};
</script>