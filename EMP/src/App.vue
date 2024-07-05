<template>
  <!-- <Navbar /> -->
  <!-- <Home /> -->
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
// import Home from './views/Home.vue';
import AddDepartment from './views/AddDepartment.vue';
import EmployeeForm from './components/EmployeeForm.vue';
// import { RouterView } from 'vue-router';

// {
//     Navbar,
//     Home
// }
export default {
  name: 'App',
  components: {
    // Navbar,
    // Home,
    AddDepartment,
    // AddEmployee,
    EmployeeForm
  }
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  /* Optional: Background color for the entire app */
}
</style>
