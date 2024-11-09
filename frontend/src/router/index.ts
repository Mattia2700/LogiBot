
import Dashboard from '@views/Dashboard.vue';

import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router';


const routes = [
  { path: '/', component: Dashboard },
 
  { path: '/:pathMatch(.*)*', redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;
