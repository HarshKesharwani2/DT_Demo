<template>
  <!-- <Navbar/> -->
  <Home />
  <!-- <div id="app" class="bg-gray-100">
    <EmployeeForm />
  </div> -->
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Home from './views/Home.vue'

// {
//     Navbar,
//     Home
// }
export default {
  name: 'App',
  components: {
    // Navbar,
    Home,
  }
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
