<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 flex items-center p-6">
        <div class="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-4">Add Employee</h2>
            <!-- Form for adding employee -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <!-- Employee Name -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="empName" class="block mb-1 md:mb-0 md:mr-4">Employee Name<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="employeeName" id="empName" type="text" placeholder="Enter employee name"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                </div>

                <!-- Salary -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="empSalary" class="block mb-1 md:mb-0 md:mr-4">Salary<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="salary" id="empSalary" type="number" placeholder="Enter Salary"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                </div>

                <!-- Age -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="empAge" class="block mb-1 md:mb-0 md:mr-4">Age<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="age" id="empAge" type="number" placeholder="Enter Age"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                </div>

                <!-- Id -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="empId" class="block mb-1 md:mb-0 md:mr-4">Id<span class="text-red-500">*</span>:</label>
                    <input v-model="id" id="empId" type="number" placeholder="Enter Id"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                </div>

                <!-- Submit Button -->
                <div class="text-center mt-6">
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
            employeeName: '',
            salary: '',
            age: '',
            id: '',
        };
    },
    methods: {
        submitForm() {
            if (confirm("Are you sure?")) {
                const employeeData = {
                    employee_name: this.employeeName,
                    employee_salary: this.salary,
                    employee_age: this.age,
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
/* / No additional scoped styles needed with Tailwind CSS / */
</style>
