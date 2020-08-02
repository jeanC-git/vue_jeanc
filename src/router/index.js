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
    component: () => import(/* webpackChunkName: "about" */ '../views/PanelApp.vue')
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

  // TRATANDO DE ACCEDER A UNA PAGINA PRIVADA Y NO ESTA LOGEADO
  // REDIRECCIONA A PAGINA PRINCIPAL
  if (authRequired && !loggedIn) {
    next('/inicio');
  } else {
    next();
  }
});
export default router
