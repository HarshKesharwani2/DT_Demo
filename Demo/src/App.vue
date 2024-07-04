<template>
  <div id="app" class="d-flex align-items-center justify-content-center min-vh-100">
    <EmployeeForm />
  </div>
</template>

<script>
import EmployeeForm from './components/EmployeeForm.vue';

export default {
  name: 'App',
  components: {
    EmployeeForm,
  },
};
</script>

<style>
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
