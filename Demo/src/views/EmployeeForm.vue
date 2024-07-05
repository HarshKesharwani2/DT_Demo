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
      <h2 class="text-xl font-bold mb-2">Edit Employee Information</h2>
      <form @submit.prevent="updateEmployeeData">
        <div class="mb-4">
          <label for="employeeName" class="block text-gray-700">Name:</label>
          <input
            type="text"
            v-model="employeeName"
            id="employeeName"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="employeeSalary" class="block text-gray-700">Salary:</label>
          <input
            type="number"
            v-model="employeeSalary"
            id="employeeSalary"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <label for="employeeAge" class="block text-gray-700">Age:</label>
          <input
            type="number"
            v-model="employeeAge"
            id="employeeAge"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded">Save</button>
      </form>
      <button @click="debounceDeleteEmployeeData(employeeData.data.id)" class="bg-red-500 text-white py-1 px-3 rounded mt-4">Delete Employee</button>
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
      employeeName: '',
      employeeSalary: '',
      employeeAge: ''
    };
  },
  methods: {
    debounce(fn, delay) {
      let timeoutID;
      return function (...args) {
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
        const response = await fetch(
          `https://dummy.restapiexample.com/api/v1/employee/${this.employeeId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        this.employeeData = await response.json();
        this.populateEmployeeForm();
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
      try {
        const response = await fetch(
          `https://dummy.restapiexample.com/api/v1/delete/${id}`,
          {
            method: 'DELETE'
          }
        );
        const result = await response.json();
        if (result.status === 'success') {
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
    async updateEmployeeData() {
      const updatedData = {
        id: this.employeeData.data.id,
        employee_name: this.employeeName,
        employee_salary: this.employeeSalary,
        employee_age: this.employeeAge
      };

      try {
        const response = await fetch(
          `https://dummy.restapiexample.com/api/v1/update/${this.employeeData.data.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          }
        );
        const result = await response.json();
        if (result.status === 'success') {
          this.employeeData.data = updatedData;
          alert('Employee data updated successfully.');
        } else {
          throw new Error('Failed to update employee data.');
        }
      } catch (error) {
        this.errorMessage = 'There was a problem with the update operation.';
        console.error('There was a problem with the update operation:', error);
      }
    },
    populateEmployeeForm() {
      this.employeeName = this.employeeData.data.employee_name;
      this.employeeSalary = this.employeeData.data.employee_salary;
      this.employeeAge = this.employeeData.data.employee_age;
    }
  },
  created() {
    this.fetchEmployeeData = this.debounce(this.fetchEmployeeData, 1000);
    this.debounceDeleteEmployeeData = this.debounce(
      this.deleteEmployeeData,
      1000
    );
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
