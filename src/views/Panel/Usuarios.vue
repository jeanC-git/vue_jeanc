<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="12" md="12" lg="12" class="py-0">
      <v-data-table
        v-model="seleccionados"
        :headers="cabeceras"
        :items="usuarios"
        :single-select="singleSelect"
        item-key="id"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Gestión de Roles</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn outlined @click="dialogCRUDuser('agregar','')">
              <v-icon class="mr-1">mdi-plus</v-icon>Agregar usuario
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.acciones="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDuser('editar', item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Editar Usuario</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="dialogCRUDuser('eliminar', item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Usuario</span>
          </v-tooltip>
        </template>
        <template v-slot:item.nombre_completo="{ item }">{{ item.nombres }}, {{ item.apellidos }}</template>
        <template v-slot:item.estado="{ item }">
          <v-chip v-if="item.estado == 1" color="green" text-color="white">Activo</v-chip>
          <v-chip v-if="item.estado == 2" color="red" text-color="white">Inactivo</v-chip>
        </template>
      </v-data-table>
    </v-col>
    <!-- ============== DIALOG CRUD ROL EDITAR/AGREGAR/ELIMINAR ============== -->
    <v-dialog v-model="dialog_CRUDuser" persistent width="unset">
      <v-card style="font-size: calc(1em + 0.5vw);">
        <v-card-title style="font-size: 1.5em; word-break: break-word;">{{CRUDuser.titulo}}</v-card-title>
        <v-card-subtitle
          class="pb-0"
          style="color:red"
          v-for="(error,i) in CRUDuser.msg"
          :key="i"
        >{{error.msg}}</v-card-subtitle>

        <v-card-text v-if="CRUDuser.tipo != 'eliminar'">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field label="Nombres" v-model="CRUDuser.nombres"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field label="Apellidos" v-model="CRUDuser.apellidos"></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="CRUDuser.tipo == 'agregar'">
            <v-col cols="12" sm="12" md="12" lg="12">
              <v-text-field label="Email" v-model="CRUDuser.email"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Contraseña"
                v-model="CRUDuser.password"
                :type="ver_password ? 'text' :'password'"
                :append-icon="ver_password ? 'mdi-eye' :'mdi-eye-off'"
                @click:append="ver_password =!ver_password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                label="Confirmar contraseña"
                v-model="CRUDuser.password_confirmation"
                :type="ver_password ? 'text' :'password'"
                :append-icon="ver_password ? 'mdi-eye' :'mdi-eye-off'"
                @click:append="ver_password =!ver_password"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-select
                label="Roles"
                :items="roles"
                item-text="nombreRol"
                item-value="id"
                v-model="CRUDuser.rol_id"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-select
                label="Estado"
                :items="[{id: 1, estado:'Activo'}, {id:2, estado:'Inactivo'}]"
                item-text="estado"
                item-value="id"
                v-model="CRUDuser.estado"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12">
              <p
                class="pt-6"
                style="font-size: calc(1em + 0.5vw);"
              >¿Está seguro que desea eliminar este elemento?</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined @click="dialog_CRUDuser = false">Cancelar</v-btn>
          <v-btn @click="doCRUDuser(CRUDuser.tipo)" v-text="CRUDuser.boton"></v-btn>
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
          text: "Nombres y Apellidos",
          align: "start",
          sortable: true,
          value: "nombre_completo"
        },
        { text: "Email", value: "email", sortable: true, align: "start" },
        { text: "Rol", value: "nombreRol", sortable: true, align: "start" },
        { text: "Estado", value: "estado", sortable: true, align: "center" },
        {
          text: "Acciones",
          value: "acciones",
          sortable: false,
          align: "center"
        }
      ],
      usuarios: [],
      roles: [],
      dialog_CRUDuser: false,
      ver_password: false,
      CRUDuser: {
        id: "",
        titulo: "",
        nombres: "",
        apellidos: "",
        email: "",
        rol_id: "",
        estado: "",
        password: "",
        password_confirmation: "",
        boton: "",
        tipo: "",
        msg: []
      }
    };
  },
  created() {
    let vue = this;
    vue.doCRUDuser("listar", "");
    vue.getRoles();
  },
  methods: {
    dialogCRUDuser(tipo, usuario) {
      let vue = this;
      vue.dialog_CRUDuser = true;
      switch (tipo) {
        case "agregar":
          vue.CRUDuser = {
            msg: [],
            titulo: "AGREGAR USUARIO",
            nombres: "",
            apellidos: "",
            email: "",
            rol_id: "",
            estado: "",
            password: "",
            password_confirmation: "",
            boton: "AGREGAR",
            tipo: "agregar"
          };

          break;
        case "editar":
          vue.CRUDuser = {
            id: usuario.id,
            titulo: "EDITAR USUARIO",
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            rol_id: usuario.rol_id,
            estado: usuario.estado,
            password: usuario.password,
            password_confirmation: usuario.password_confirmation,
            boton: "GUARDAR",
            tipo: "editar",
            msg: []
          };
          break;
        case "eliminar":
          vue.CRUDuser = {
            msg: [],
            titulo: "ELIMINAR USUARIO",
            nombres: "",
            apellidos: "",
            email: "",
            rol_id: "",
            password: "",
            estado: "",
            password_confirmation: "",
            boton: "ELIMINAR",
            tipo: "eliminar"
          };
          break;
      }
    },
    doCRUDuser(tipo) {
      let vue = this;
      switch (tipo) {
        case "listar":
          vue.$store.dispatch("administrador/getUsuarios").then(
            response => {
              vue.usuarios = response.data;
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
            .dispatch("administrador/agregarUsuario", {
              nombres: vue.CRUDuser.nombres,
              apellidos: vue.CRUDuser.apellidos,
              email: vue.CRUDuser.email,
              password: vue.CRUDuser.password,
              password_confirmation: vue.CRUDuser.password_confirmation,
              rol_id: vue.CRUDuser.rol_id,
              estado: vue.CRUDuser.estado
            })
            .then(
              response => {
                vue.doCRUDuser("listar", "");
                vue.dialog_CRUDuser = false;
              },
              error => {
                vue.CRUDuser.msg = error.response.data;
              }
            );
          break;

        case "editar":
          vue.$store
            .dispatch("administrador/editarUsuario", {
              id: vue.CRUDuser.id,
              nombres: vue.CRUDuser.nombres,
              apellidos: vue.CRUDuser.apellidos,
              password: vue.CRUDuser.password,
              password_confirmation: vue.CRUDuser.password_confirmation,
              rol_id: vue.CRUDuser.rol_id,
              estado: vue.CRUDuser.estado
            })
            .then(
              response => {
                vue.doCRUDuser("listar", "");
                vue.dialog_CRUDuser = false;
              },
              error => {
                vue.CRUDuser.msg = error.response.data;
              }
            );
          break;
        case "eliminar":
          vue.$store
            .dispatch("administrador/eliminarRol", {
              id: vue.CRUDuser.id
            })
            .then(
              response => {
                vue.doCRUDuser("listar", "");
                vue.dialog_CRUDuser = false;
              },
              error => {
                vue.CRUDuser.msg = error.response.data;
              }
            );
          break;
      }
    },

    getRoles() {
      let vue = this;

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
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/inicio");
    }
  }
};
</script>