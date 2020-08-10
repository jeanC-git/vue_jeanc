<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
      <v-data-table
        v-model="seleccionados"
        :headers="cabeceras"
        :items="roles"
        :single-select="singleSelect"
        item-key="id"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title
              style="word-break: break-word;"
              :style="($vuetify.breakpoint.xsOnly) ? 'font-size: calc(1em + 0.8vw)' : ''"
            >Gestión de Roles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              :small="$vuetify.breakpoint.xsOnly"
              outlined
              @click="dialogCRUDrol('agregar','')"
            >
              <v-icon :small="$vuetify.breakpoint.xsOnly">mdi-plus</v-icon>
              {{$vuetify.breakpoint.xsOnly ? 'Rol': 'Agregar rol'}}
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.permisos="{item}">
          <v-chip
            v-for="(p,i) in JSON.parse(item.permisos)"
            :key="i"
            class="ma-1"
          >{{p.recurso}}| Ver: {{p.ver ? 'Si' : 'No'}} Agregar: {{p.agregar ? 'Si':'No'}} Editar: {{p.editar ? 'Si' :'No'}} Eliminar: {{p.eliminar ? 'Si':'No'}}</v-chip>
        </template>
        <template v-slot:item.acciones="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDrol('editar', item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar Rol</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDrol('eliminar', item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Rol</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-col>
    <!-- ============== DIALOG CRUD ROL EDITAR/AGREGAR/ELIMINAR ============== -->
    <v-dialog v-model="dialog_CRUDrol" persistent width="unset">
      <v-card style="font-size: calc(1em + 0.5vw);">
        <v-card-title style="font-size: 1.5em; word-break: break-word;">{{CRUDrol.titulo}}</v-card-title>

        <v-card elevation="0" v-if="CRUDrol.msg.length" color="blue-grey lighten-5">
          <v-card-subtitle
            style="color:red; "
            v-for="(error,i) in CRUDrol.msg"
            :key="i"
          >{{error.msg}}</v-card-subtitle>
        </v-card>

        <v-card-text v-if="CRUDrol.tipo != 'eliminar'">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-text-field label="Nombre del Rol" v-model="CRUDrol.nombreRol"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <p
                class="pt-6"
                style="font-size: 1.5em;"
              >¿Está seguro que desea eliminar este elemento?</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialog_CRUDrol = false">Cancelar</v-btn>
          <v-btn @click="doCRUDrol(CRUDrol.tipo)" v-text="CRUDrol.boton"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ============== /DIALOG CRUD ROL EDITAR/AGREGAR ============== -->
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
          text: "ID",
          align: "start",
          sortable: false,
          value: "id"
        },
        {
          text: "Rol",
          align: "start",
          sortable: false,
          value: "nombreRol"
        },
        {
          text: "Acciones",
          value: "acciones",
          sortable: false,
          align: "center"
        }
      ],
      roles: [],
      dialog_CRUDrol: false,
      CRUDrol: {
        id: "",
        titulo: "",
        nombreRol: "",
        boton: "",
        tipo: "",
        msg: []
      }
    };
  },
  created() {
    let vue = this;
    vue.doCRUDrol("listar", "");
  },
  methods: {
    dialogCRUDrol(tipo, rol) {
      let vue = this;
      vue.dialog_CRUDrol = true;
      switch (tipo) {
        case "agregar":
          vue.CRUDrol = {
            msg: [],
            titulo: "AGREGAR ROL",
            boton: "AGREGAR",
            tipo: "agregar"
          };

          break;
        case "editar":
          vue.CRUDrol = {
            id: rol.id,
            titulo: "EDITAR ROL",
            nombreRol: rol.nombreRol,
            boton: "GUARDAR",
            tipo: "editar",
            msg: []
          };
          break;
        case "eliminar":
          vue.CRUDrol = {
            id: rol.id,
            titulo: "ELIMINAR ROL",
            nombreRol: rol.nombreRol,
            boton: "ELIMINAR",
            tipo: "eliminar",
            msg: []
          };
          break;
      }
    },
    doCRUDrol(tipo) {
      let vue = this;
      switch (tipo) {
        case "listar":
          vue.$store.dispatch("administrador/getRoles").then(
            response => {
              vue.roles = response.data;
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
          break;
        case "agregar":
          vue.$store
            .dispatch("administrador/agregarRol", {
              nombreRol: vue.CRUDrol.nombreRol
            })
            .then(
              response => {
                vue.doCRUDrol("listar", "");
                vue.dialog_CRUDrol = false;
              },
              error => {
                vue.CRUDrol.msg = error.response.data;
              }
            );
          break;

        case "editar":
          vue.$store
            .dispatch("administrador/editarRol", {
              id: vue.CRUDrol.id,
              nombreRol: vue.CRUDrol.nombreRol
            })
            .then(
              response => {
                vue.doCRUDrol("listar", "");
                vue.dialog_CRUDrol = false;
              },
              error => {
                vue.CRUDrol.msg = error.response.data;
              }
            );
          break;
        case "eliminar":
          vue.$store
            .dispatch("administrador/eliminarRol", {
              id: vue.CRUDrol.id
            })
            .then(
              response => {
                vue.doCRUDrol("listar", "");
                vue.dialog_CRUDrol = false;
              },
              error => {
                vue.CRUDrol.msg = error.response.data;
              }
            );
          break;
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    }
  }
};
</script>