import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue';
import EmployeeForm from '../components/EmployeeForm.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-employee',
      name: 'addEmployee',
      component: EmployeeForm, // Replace with your actual component for adding employees
    },
  ]
})

export default router
