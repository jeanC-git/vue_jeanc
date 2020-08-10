import Vue from 'vue'
import VueRouter from 'vue-router'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/inicio',
    name: 'Inicio2',
    component: Inicio
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel/PanelApp.vue')
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel/Usuarios.vue')
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel/Roles.vue')
  },
  {
    path: '/asignarpermisos',
    name: 'AsignarPermisos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel/AsignarPermisos.vue')
  },
  {
    path: '/modulos',
    name: 'Modulos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel/Modulos.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "about" */ '../views/TestComponents/MultiSelectDualBox.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const paginasPublicas = ['/', '/inicio', '/test'];
  const authRequired = !paginasPublicas.includes(to.path);
  const usuarioLogeado = localStorage.getItem('user');

  // PAGINA NO REQUIERE AUTENTICACION, NO IMPORTA SI ESTA LOGEADO 
  // CONTINUA A LA PAGINA SGTE
  if (!authRequired) {
    next();
    // TRATANDO DE ACCEDER A UNA PAGINA PRIVADA Y NO ESTA LOGEADO
    // REDIRECCIONA A PAGINA PRINCIPAL
  } else if (authRequired && !usuarioLogeado) {
    next('/inicio');
    // TRATANDO DE ACCEDER A UNA PAGINA PRIVADA Y SI ESTA LOGEADO
    // REDIRECCIONA AL PANEL DE USUARIO
  } else if (authRequired && usuarioLogeado) {
    // return next();
    if (to.path == '/panel') {
      next();
    }
    let permisos = JSON.parse(usuarioLogeado).user.p;
    let modulo = permisos.find((p) => p.ruta == to.path && p.nombreOperacion == 'ver');
    if (modulo) {
      next();
    } else {
      next('/panel?authRequired=true');
    }
  }
});
export default router
