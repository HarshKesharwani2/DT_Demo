// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView
//     },
//     {
//       path: '/about',
//       name: 'about',
//       component: () => import('../views/AboutView.vue')
//     }
//   ]
// })

// export default router


// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddEmployee from '../views/AddEmployee.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/add-employee', component: AddEmployee },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
