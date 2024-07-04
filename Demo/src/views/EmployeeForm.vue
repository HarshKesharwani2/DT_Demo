<template>
  <div class="container m-5">
    <h1 class="text-3xl font-bold mb-4">Employee Details</h1>
    <form @submit.prevent="fetchEmployeeData" class="mb-4">
      <div class="flex mb-4">
        <label for="employeeId" class="mr-2 content-center">Employee ID:</label>
        <input
          type="text"
          v-model="employeeId"
          id="employeeId"
          class="border border-gray-300 px-3 py-2 rounded-md w-1/2"
          placeholder="Enter Employee ID"
          required
        />
      </div>
      <button type="submit" class="bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
        Get Employee Data
      </button>
    </form>
    <div v-if="employeeData" class="card bg-gray-100 rounded-md p-4">
      <h2 class="text-xl font-bold mb-2">Employee Information</h2>
      <p><strong>ID:</strong> {{ employeeData.data.id }}</p>
      <p><strong>Name:</strong> {{ employeeData.data.employee_name }}</p>
      <p><strong>Salary:</strong> {{ employeeData.data.employee_salary }}</p>
      <p><strong>Age:</strong> {{ employeeData.data.employee_age }}</p>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-4 bg-red-100 text-red-600 p-3 rounded-md">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeId: '',
      employeeData: null,
      errorMessage: '',
    };
  },
  methods: {
    debounce(fn, delay) {
      let timeoutID;
      return function(...args) {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    },
    async fetchEmployeeData() {
      this.errorMessage = '';
      try {
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/employee/${this.employeeId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.employeeData = await response.json();
      } catch (error) {
        if (error.message === 'Network response was not ok') {
          this.errorMessage = 'Rate limit exceeded. Please try again later.';
        } else {
          this.errorMessage = 'There was a problem with the fetch operation.';
        }
        console.error('There was a problem with the fetch operation:', error);
      }
    },
  },
  created() {
    this.fetchEmployeeData = this.debounce(this.fetchEmployeeData, 1000);
  },
};
</script>

<style scoped>
/* .container{
  background-color: black;
  bottom: 10%;
} */
</style>
