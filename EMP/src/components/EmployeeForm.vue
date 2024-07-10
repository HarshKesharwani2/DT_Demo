<!-- AddEmployee.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 items-center p-6">
        <div class="mx-auto">
            <h2 class="text-2xl font-bold mb-4">Add Employee</h2>
            <!-- Form for adding employee -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <!-- Employee Name -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empName" class="block mb-1 content-center mr-10">Employee Name<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="employeeName" id="empName" type="text" placeholder="Enter employee name"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- salary -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empMobile" class="block mb-1 content-center">Salary<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="salary" id="empMobile" type="number" placeholder="Enter Salary"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Age -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDOB" class="block mb-1 content-center">Age<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="age" id="empDOB" type="number" placeholder="Enter Age"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- id -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDOJ" class="block mb-1 content-center">Id<span class="text-red-500">*</span>:</label>
                    <input v-model="id" id="id" type="number" placeholder="Enter Id"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { createUser } from '../services/api';

export default {
    data() {
        return {
            name: '',
            salary: '',
            age: '',
            id: '',
        };
    },
    methods: {
        submitForm() {
            if (confirm("Are you sure?")) {

                const employeeData = {
                    name: this.employeeName,
                    salary: this.salary,
                    age: this.age,
                    id: this.id,
                };

                createUser(employeeData)
                    .then(response => {
                        console.log('Response:', response.data);
                        alert('Employee added successfully!');
                        this.$router.push('/'); // Redirect back to the main page after adding
                    })
                    .catch(error => {
                        console.error('Error adding employee:', error);
                        alert('Failed to add employee. Please try again.');
                    });
            }
        },
    },
};
</script>

<style scoped>
/* No additional scoped styles needed with Tailwind CSS */
</style>
