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
      <button @click="openModal" class="bg-blue-500 text-white py-1 px-3 rounded mt-4 mx-5">Edit Employee</button>
      <button @click="debounceDeleteEmployeeData(employeeData.data.id)" class="bg-red-500 text-white py-1 px-3 rounded mt-4 mx-5">Delete Employee</button>
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-4">
      {{ errorMessage }}
    </div>

    <TransitionRoot as="template" :show="isModalOpen">
      <Dialog class="relative z-10" @close="isModalOpen = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon class="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Edit Employee</DialogTitle>
                      <div class="mt-2">
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
                          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="submit" class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Save</button>
                            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="closeModal" ref="cancelButtonRef">Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

export default {
  data() {
    return {
      employeeId: '',
      employeeData: null,
      errorMessage: '',
      isModalOpen: false,
      employeeName: '',
      employeeSalary: '',
      employeeAge: ''
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
        console.log(response);
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
      console.log(id);
      try {
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
          method: 'DELETE',
        });
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
        const response = await fetch(`https://dummy.restapiexample.com/api/v1/update/${this.employeeData.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
        const result = await response.json();
        if (result.status === 'success') {
          this.employeeData.data = updatedData;
          this.closeModal();
          alert('Employee data updated successfully.');
        } else {
          throw new Error('Failed to update employee data.');
        }
      } catch (error) {
        this.errorMessage = 'There was a problem with the update operation.';
        console.error('There was a problem with the update operation:', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    populateEmployeeForm() {
      this.employeeName = this.employeeData.data.employee_name;
      this.employeeSalary = this.employeeData.data.employee_salary;
      this.employeeAge = this.employeeData.data.employee_age;
    }
  },
  created() {
    this.fetchEmployeeData = this.debounce(this.fetchEmployeeData, 1000);
    this.debounceDeleteEmployeeData = this.debounce(this.deleteEmployeeData, 1000);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
