import Chats from '@views/Chats.vue';
import Dashboard from '@views/Dashboard.vue';
import Orders from '@views/Orders.vue';

import { createRouter, createWebHistory } from 'vue-router';
import Chat from "@views/Chat.vue";

const routes = [
  {
    path: '/',
    component: Dashboard,
    children: [
      { path: '/orders', component: Orders, name: 'orders' },
      { path: '/chats', component: Chats, name: 'chats' },
      { path: '/chat/:id', component: Chat, name: 'chat' }
    ],
  },

  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
