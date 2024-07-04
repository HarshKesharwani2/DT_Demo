<template>
  <div class="container mt-5">
    <h1>Employee Details</h1>
    <form @submit.prevent="fetchEmployeeData" class="mb-4">
      <div class="form-group">
        <label for="employeeId">Employee ID:</label>
        <input
          type="text"
          v-model="employeeId"
          id="employeeId"
          class="form-control"
          placeholder="Enter Employee ID"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary mt-2">Get Employee Data</button>
    </form>
    <div v-if="employeeData" class="card">
      <div class="card-body">
        <h2 class="card-title text-dark">Employee Information</h2>
        <p class="card-text text-dark"><strong>ID:</strong> {{ employeeData.data.id }}</p>
        <p class="card-text text-dark"><strong>Name:</strong> {{ employeeData.data.employee_name }}</p>
        <p class="card-text text-dark"><strong>Position:</strong> {{ employeeData.data.employee_salary }}</p>
        <p class="card-text text-dark"><strong>Department:</strong> {{ employeeData.data.employee_age }}</p>
      </div>
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
h1 {
  color: black;
}

label {
  color: #000;
}

/* div h2 {
  color: #000
} */

/* div p {
  color: #000
} */
</style>
