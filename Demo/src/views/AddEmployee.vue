<template>
    <div>
      <h1 class="text-2xl font-bold mb-4">Add Employee</h1>
      <form @submit.prevent="addEmployee">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name:</label>
          <input type="text" v-model="name" id="name" class="w-full p-2 border border-gray-300 rounded mt-1" required />
        </div>
        <!-- Add other input fields similarly -->
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Add Employee</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddEmployee',
    data() {
      return {
        name: '',
        // Add other data properties similarly
      };
    },
    methods: {
      addEmployee() {
        // Handle form submission
      },
    },
  };
  </script>
  