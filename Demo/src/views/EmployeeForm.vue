<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Employee Details</h1>
    <form @submit.prevent="fetchEmployeeData" class="mb-4">
      <div class="mb-4">
        <label for="employeeId" class="block text-gray-700">Employee ID:</label>
        <input
          type="text"
          v-model="employeeId"
          id="employeeId"
          class="w-full p-2 border border-gray-300 rounded mt-1"
          placeholder="Enter Employee ID"
          required
        />
      </div>
      <button type="submit" class="bg-gray-800 text-white py-2 px-4 rounded">Get Employee Data</button>
    </form>
    <div v-if="employeeData" class="card bg-gray-100 rounded-md p-4">
      <h2 class="text-xl font-bold mb-2">Employee Information</h2>
      <p><strong>ID:</strong> {{ employeeData.data.id }}</p>
      <p><strong>Name:</strong> {{ employeeData.data.employee_name }}</p>
      <p><strong>Salary:</strong> {{ employeeData.data.employee_salary }}</p>
      <p><strong>Age:</strong> {{ employeeData.data.employee_age }}</p>
      <button @click="debounceDeleteEmployeeData(employeeData.id)" class="bg-red-500 text-white py-2 px-4 rounded mt-4">Delete Employee</button>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-4">
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
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        console.log(response);
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
    async deleteEmployeeData(id) {
      console.log(id);
      try {
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result) {
          this.employeeData = null;
          alert('Employee data deleted successfully.');
        } else {
          throw new Error('Failed to delete employee data.');
        }
      } catch (error) {
        this.errorMessage = 'There was a problem with the delete operation.';
        console.error('There was a problem with the delete operation:', error);
      }
    },
  },
  created() {
    this.fetchEmployeeData = this.debounce(this.fetchEmployeeData, 1000);
    this.debounceDeleteEmployeeData = this.debounce(this.deleteEmployeeData, 1000);
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
