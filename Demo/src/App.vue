<template>
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
</style>