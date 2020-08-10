<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-card>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field v-model="buscadorOpciones" clearable label="Buscar 1"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field v-model="buscadorSeleccionados" clearable label="Buscar 1"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-list dense shaped style="max-height: 200px" class="overflow-y-auto">
                  <v-subheader>Permisos para agregar</v-subheader>
                  <v-list-item-group>
                    <v-list-item
                      v-for="
                      o in filtrarOpciones"
                      :key="o.texto"
                      @click="moverDerecha(opciones.indexOf(o))"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{o.texto}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-list dense shaped style="max-height: 200px" class="overflow-y-auto">
                  <v-subheader>Permisos actuales</v-subheader>
                  <v-list-item-group>
                    <v-list-item
                      v-for="s in filtrarSeleccionados"
                      :key="s.texto"
                      @click="moverIzquierda(seleccionados.indexOf(s))"
                    >
                      <v-list-item-content>
                        <v-list-item-title>{{s.texto}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" md="6" lg="6" class="d-flex justify-center">
                <v-btn v-bind="size" @click="moverDerecha(-1)">Mover todo a la derecha</v-btn>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="d-flex justify-center">
                <v-btn v-bind="size" @click="moverIzquierda(-1)">Mover todo a la izquierda</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn v-bind="size" color="primary">Asignar permisos</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: ["options"],
  data() {
    return {
      seleccionados: [
        {
          id: 1,
          texto: "Lima"
        },
        {
          id: 2,
          texto: "Arequipa"
        },
        {
          id: 3,
          texto: "Tacna"
        },
        {
          id: 4,
          texto: "Moquegua"
        }
      ],
      opciones: [
        {
          id: 5,
          texto: "Loreto"
        },
        {
          id: 6,
          texto: "Ucayali"
        }
      ],
      buscadorOpciones: "",
      buscadorSeleccionados: ""
    };
  },
  methods: {
    moverDerecha(index) {
      let vue = this;
      console.log(index);
      if (index >= 0) {
        vue.seleccionados.push(vue.opciones[index]);
        vue.opciones.splice(index, 1);
      } else {
        for (var cont = 0; cont < vue.opciones.length; cont++) {
          vue.seleccionados.push(vue.opciones[cont]);
        }

        vue.opciones.splice(0, vue.opciones.length);
      }
    },
    moverIzquierda(index) {
      let vue = this;
      console.log(index);
      if (index >= 0) {
        vue.opciones.push(vue.seleccionados[index]);
        vue.seleccionados.splice(index, 1);
        return;
      }

      for (var cont = 0; cont < vue.seleccionados.length; cont++) {
        vue.opciones.push(vue.seleccionados[cont]);
      }
      vue.seleccionados.splice(0, vue.seleccionados.length);
    }
  },
  computed: {
    filtrarOpciones() {
      let vue = this;

      if (vue.buscadorOpciones) {
        return vue.opciones.filter(item => {
          return item.texto.toLowerCase().indexOf(vue.buscadorOpciones) !== -1;
        });
      }
      return vue.opciones;
    },
    filtrarSeleccionados() {
      let vue = this;

      if (vue.buscadorSeleccionados) {
        return vue.seleccionados.filter(item => {
          return (
            item.texto.toLowerCase().indexOf(vue.buscadorSeleccionados) !== -1
          );
        });
      }
      return vue.seleccionados;
    },
    size() {
      const size = { xs: "x-small", sm: "small", lg: "large", xl: "x-large" }[
        this.$vuetify.breakpoint.name
      ];
      return size ? { [size]: true } : {};
    }
  }
};
</script>
