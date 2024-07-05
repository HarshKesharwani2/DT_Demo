import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EmployeeForm from '../components/EmployeeForm.vue';
import AddDepartment from '@/views/AddDepartment.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/AddEmployee',
      name: 'Empform',
      component: EmployeeForm,
    },
    {
      path: '/AddDepartment',
      name: 'AddDept',
      component: AddDepartment,
    },
  ],
});

export default router;
