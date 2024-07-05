<template>
    <div>
        <h2>Add Employee</h2>
        <!-- Form for adding employee -->
        <form @submit.prevent="submitForm">
            <!-- Example fields -->
            <label for="empName">Employee Name:</label>
            <input v-model="employeeName" id="empName" type="text" required>

            <label for="empDepartment">Department:</label>
            <input v-model="department" id="empDepartment" type="text" required>

            <!-- Add more fields as per your form -->

            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            employeeName: '',
            department: '',
            // Add more data properties as needed
        };
    },
    methods: {
        submitForm() {
            // Logic to handle form submission (e.g., save employee)
            // After saving, you can redirect or perform other actions
            this.$router.push('/'); // Redirect back to the main page after adding
        },
    },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
