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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/inicio'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // PAGINA NO REQUIERE AUTENTICACION, NO IMPORTA SI ESTA LOGEADO 
  // CONTINUA A LA PAGINA SGTE
  if (!authRequired) {
    next();
    // TRATANDO DE ACCEDER A UNA PAGINA PRIVADA Y NO ESTA LOGEADO
    // REDIRECCIONA A PAGINA PRINCIPAL
  } else if (authRequired && !loggedIn) {
    next('/inicio');
    // TRATANDO DE ACCEDER A UNA PAGINA PRIVADA Y SI ESTA LOGEADO
    // REDIRECCIONA AL PANEL DE USUARIO
  } else if (authRequired && loggedIn) {
    if (to.path == '/panel') {
      return next();
    }
    let permisos = JSON.parse(JSON.parse(loggedIn).user.permisos);
    permisos.forEach(p => {
      if (p.routeRecurso == to.path) {
        if (p.ver) {
          return next();
        } else {
          return next('/panel?authRequired=true');
        }
      }
    });
  }
});
export default router
