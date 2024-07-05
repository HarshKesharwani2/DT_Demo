<!-- <template>
  <Navbar/>
  <div id="app" class="bg-gray-100">
    <EmployeeForm />
  </div>
</template>

<script>
import EmployeeForm from './views/EmployeeForm.vue';
import Navbar from './components/Navbar.vue';
export default {
  name: 'App',
  components: {
    EmployeeForm,
    Navbar,
  },
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa; /* Optional: Background color for the entire app */
}
</style> -->

<template>
  <div id="app">
    <header class="bg-gray-800 text-white p-4">
      <nav class="container mx-auto flex justify-between">
        <div class="text-xl font-bold">Employee Management</div>
        <div>
          <router-link class="mr-4" to="/">Home</router-link>
          <router-link to="/add-employee">Add Employee</router-link>
        </div>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import './index.css';
</style>
