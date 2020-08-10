<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
      <v-data-table
        v-model="seleccionados"
        :headers="cabeceras"
        :items="modulos"
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
            >Gestión de Módulos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              :small="$vuetify.breakpoint.xsOnly"
              outlined
              @click="dialogCRUDmodulo('agregar','')"
            >
              <v-icon :small="$vuetify.breakpoint.xsOnly">mdi-plus</v-icon>
              {{$vuetify.breakpoint.xsOnly ? 'Recurso': 'Agregar recurso'}}
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
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDmodulo('editar', item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar módulo</span>
          </v-tooltip>
          <!-- <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDmodulo('eliminar', item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Recurso</span>
          </v-tooltip>-->
        </template>
      </v-data-table>
    </v-col>
    <!-- ============== DIALOG CRUD RECURSO EDITAR/AGREGAR/ELIMINAR ============== -->
    <v-dialog v-model="dialog_CRUDmodulo" persistent width="unset">
      <v-card style="font-size: calc(1em + 0.5vw);">
        <v-card-title style="font-size: 1.5em; word-break: break-word;">{{CRUDmodulo.titulo}}</v-card-title>
        <v-card-subtitle class="mt-4" v-if=" Object.keys(CRUDmodulo.msg).length !== 0">
          <ul v-if="CRUDmodulo.msg.nombreModulo">
            <li v-for="(e,i) in CRUDmodulo.msg.nombreModulo" :key="i">{{e}}</li>
          </ul>
          <ul v-if="CRUDmodulo.msg.ruta">
            <li v-for="(e,i) in CRUDmodulo.msg.ruta" :key="i">{{e}}</li>
          </ul>
        </v-card-subtitle>

        <v-card-text v-if="CRUDmodulo.tipo != 'eliminar'">
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="Nombre del recurso" v-model="CRUDmodulo.nombreModulo"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="6">
              <v-text-field label="Ruta del recurso" v-model="CRUDmodulo.ruta"></v-text-field>
            </v-col>
          </v-row>
          <v-btn small rounded @click="agregarOperacion()">
            <v-icon small>mdi-plus</v-icon>Acciones
          </v-btn>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>#</th>
                  <th class="text-left">Permiso</th>
                  <th class="text-left">Descripción</th>
                  <th class="text-center">
                    <v-icon>mdi-delete</v-icon>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p,i) in CRUDmodulo.operaciones" :key="i">
                  <td>{{i+1}}</td>
                  <td>
                    <v-text-field hide-details dense solo v-model="p.nombreOperacion"></v-text-field>
                  </td>
                  <td>
                    <v-text-field hide-details dense solo v-model="p.descripcion"></v-text-field>
                  </td>
                  <td>
                    <v-btn @click="eliminarPermiso(i)" icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
          <v-btn outlined @click="dialog_CRUDmodulo = false">Cancelar</v-btn>
          <v-btn @click="doCRUDmodulo(CRUDmodulo.tipo)" v-text="CRUDmodulo.boton"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ============== /DIALOG CRUD RECURSO EDITAR/AGREGAR ============== -->
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
          text: "Recursos",
          align: "start",
          sortable: false,
          value: "nombreModulo"
        },
        { text: "Ruta", value: "ruta", align: "start" },
        {
          text: "Acciones",
          value: "acciones",
          sortable: false,
          align: "center"
        }
      ],
      modulos: [],
      dialog_CRUDmodulo: false,
      CRUDmodulo: {
        id: "",
        titulo: "",
        nombreModulo: "",
        ruta: "/",
        boton: "",
        tipo: "",
        msg: [],
        operaciones: []
      }
    };
  },
  created() {
    let vue = this;
    vue.doCRUDmodulo("listar", "");
  },
  methods: {
    dialogCRUDmodulo(tipo, modulo) {
      let vue = this;
      vue.dialog_CRUDmodulo = true;
      switch (tipo) {
        case "agregar":
          vue.CRUDmodulo = {
            id: "",
            titulo: "AGREGAR MODULO",
            nombreModulo: "",
            ruta: "/",
            boton: "AGREGAR",
            tipo: "agregar",
            msg: [],
            operaciones: []
          };

          break;
        case "editar":
          vue.CRUDmodulo = {
            id: modulo.id,
            titulo: "EDITAR MODULO",
            nombreModulo: modulo.nombreModulo,
            ruta: modulo.ruta,
            boton: "EDITAR",
            tipo: "editar",
            msg: [],
            operaciones: modulo.get_operaciones
          };
          break;
        case "eliminar":
          vue.CRUDmodulo = {
            id: modulo.id,
            titulo: "ELIMINAR MODULO",
            nombreModulo: modulo.nombreModulo,
            ruta: modulo.ruta,
            boton: "ELIMINAR",
            tipo: "eliminar",
            operaciones: []
          };
          break;
      }
    },
    doCRUDmodulo(tipo) {
      let vue = this;
      switch (tipo) {
        case "listar":
          vue.$store.dispatch("administrador/getModulos").then(
            response => {
              vue.modulos = response.data;
            },
            error => {
              vue.getError();
            }
          );
          break;
        case "agregar":
          vue.$store
            .dispatch("administrador/agregarModulos", {
              nombreModulo: vue.CRUDmodulo.nombreModulo,
              ruta: vue.CRUDmodulo.ruta,
              operaciones: vue.CRUDmodulo.operaciones
            })
            .then(
              response => {
                vue.doCRUDmodulo("listar", "");
                vue.dialog_CRUDmodulo = false;
              },
              error => {
                vue.CRUDmodulo.msg = JSON.parse(error.response.data);
              }
            );
          break;

        case "editar":
          vue.$store
            .dispatch("administrador/editarRol", {
              id: vue.CRUDmodulo.id,
              nombreModulo: vue.CRUDmodulo.nombreModulo
            })
            .then(
              response => {
                vue.doCRUDmodulo("listar", "");
                vue.dialog_CRUDmodulo = false;
              },
              error => {
                vue.CRUDmodulo.msg = error.response.data;
              }
            );
          break;
        case "eliminar":
          vue.$store
            .dispatch("administrador/eliminarRol", {
              id: vue.CRUDmodulo.id
            })
            .then(
              response => {
                vue.doCRUDmodulo("listar", "");
                vue.dialog_CRUDmodulo = false;
              },
              error => {
                vue.CRUDmodulo.msg = error.response.data;
              }
            );
          break;
      }
    },
    agregarOperacion() {
      let vue = this;

      let nueva_operacion = {
        nombreOperacion: "Nombre de la operación",
        descripcion: "Descripción de la operación"
      };
      vue.CRUDmodulo.operaciones.push(nueva_operacion);
    },
    eliminarPermiso(i) {
      let vue = this;
      vue.CRUDmodulo.operaciones.splice(i, 1);
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    }
  }
};
</script>