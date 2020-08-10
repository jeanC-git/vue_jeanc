<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  label="Roles"
                  :items="roles_no_ROLBASE"
                  item-value="id"
                  item-text="nombreRol"
                  v-model="data.rol_id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4">
                <v-select
                  label="Módulos"
                  :items="modulos"
                  item-value="id"
                  item-text="nombreModulo"
                  v-model="data.modulo_id"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" lg="4" class="text-center">
                <v-btn outlined class="mt-3" @click="buscarPermisosxRecurso()">
                  <v-icon large class="mr-2">mdi-card-search</v-icon>Buscar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-dual-select-box :options="options" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VDualSelectBox from "../../components/MultiSelectDualBox";
export default {
  components: {
    VDualSelectBox
  },
  data() {
    return {
      // MULTIPLE SELECT BOX
      options: {
        buscadorTexto1: "Buscar permisos disponibles",
        buscadorTexto2: "Buscar permisos actuales",
        subHeader1: "Permisos para disponibles para agregar",
        subHeader2: "Permisos actuales",
        noData1:
          "Ya no hay permisos para asignar o la palabra clave no tiene coincidencias.",
        noData2:
          "Aún no hay permisos asignados o la palabra clave no tiene coincidencias.",
        seleccionados: [],
        opciones: [],
        loaderText: "Procesando ..."
      },
      // MULTIPLE SELECT BOX

      singleSelect: false,
      seleccionados: [],
      modulos: [],
      roles: [],
      data: {
        rol_id: null,
        modulo_id: null
      }
    };
  },
  created() {
    let vue = this;
    vue.getRoles();
    vue.getModulos();
  },
  computed: {
    roles_no_ROLBASE() {
      let vue = this;
      return vue.roles.filter(r => r.nombreRol !== "ROL_BASE");
    }
  },
  methods: {
    getRoles() {
      let vue = this;

      vue.$store.dispatch("administrador/getRoles").then(
        response => {
          vue.roles = response.data;
          if (vue.roles.length) {
            vue.data.rol_id = response.data[0].id;
          }
        },
        error => {
          if (error && error.response.data.msg && error.response.data.cod) {
            vue.swal(
              `Mensaje de sistema: ${error.response.data.msg}`,
              "warning",
              2500,
              "top",
              "fadeInDown",
              "fadeOut"
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
    getModulos() {
      let vue = this;

      vue.$store.dispatch("administrador/getModulos").then(
        response => {
          vue.modulos = response.data;
          if (vue.modulos.length) {
            vue.data.modulo_id = response.data[0].id;
          }
        },
        error => {
          if (error && error.response.data.msg && error.response.data.cod) {
            vue.swal(
              `Mensaje de sistema: ${error.response.data.msg}`,
              "warning",
              2500,
              "top",
              "fadeInDown",
              "fadeOut"
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
            "fadeInRight",
            "fadeOutRight"
          );
          let index = vue.roles.findIndex(rol => rol.id == data.id);
          vue.roles[index].permisos = data.data;
        },
        error => {
          console.log(error.response);
        }
      );
    },
    buscarPermisosxRecurso() {
      let vue = this;
      vue.$store
        .dispatch("administrador/getPermisosYOperaciones", {
          rol_id: vue.data.rol_id,
          modulo_id: vue.data.modulo_id
        })
        .then(
          response => {
            vue.options.opciones = response.data._permisos_actuales.filter(
              o => o.value == 0
            );
            vue.options.seleccionados = response.data._permisos_actuales.filter(
              o => o.value == 1
            );
          },
          error => {
            if (error && error.response.data.msg && error.response.data.cod) {
              vue.swal(
                `Mensaje de sistema: ${error.response.data.msg}`,
                "warning",
                2500,
                "top",
                "fadeInDown",
                "fadeOut"
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
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    }
  }
};
</script>