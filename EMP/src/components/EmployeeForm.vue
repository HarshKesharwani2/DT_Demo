<template>
    <div class="bg-gradient-to-b from-blue-300 to-blue-600 items-center p-6">
        <div class="max-w-4xl mx-auto">
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

                <!-- Email -->
                <div class="flex flex-row justify-between mx-20 ">
                    <label for="empEmail" class="block mb-1 content-center">Email<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="email" id="empEmail" type="email" placeholder="Enter email address"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Mobile -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empMobile" class="block mb-1 content-center">Mobile<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="mobile" id="empMobile" type="text" placeholder="Enter mobile number"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Department -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDepartment" class="block mb-1 content-center">Department<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="department" id="empDepartment" type="text" placeholder="Enter department"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Date of Birth (DOB) -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDOB" class="block mb-1 content-center">Date of Birth<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="dob" id="empDOB" type="date"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Address -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empAddress" class="block mb-1 content-center">Address<span
                            class="text-red-500">*</span>:</label>
                    <textarea v-model="address" id="empAddress" rows="3"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required></textarea>
                </div>

                <!-- Date of Joining (DOJ) -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDOJ" class="block mb-1 content-center">Date of Joining<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="doj" id="empDOJ" type="date"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Gender -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empGender" class="block mb-1 content-center">Gender<span
                            class="text-red-500">*</span>:</label>
                    <select v-model="gender" id="empGender"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
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
export default {
    data() {
        return {
            employeeName: '',
            email: '',
            mobile: '',
            department: '',
            dob: '',
            address: '',
            doj: '',
            gender: '',
        };
    },
    methods: {
        submitForm() {
            alert("Successfull Added Employee")
            this.$router.push('/'); // Redirect back to the main page after adding
        },
    },
};
</script>

<style scoped>
/* No additional scoped styles needed with Tailwind CSS */
</style>
