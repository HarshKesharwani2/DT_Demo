<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 items-center p-6">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-2xl font-bold mb-4">Add Department</h2>
            <!-- Form for adding employee -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <!-- Department Name -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empName" class="block mb-1 content-center mr-10">Department Name<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="employeeName" id="empName" type="text" placeholder="Enter employee name"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                </div>

                <!-- Department Type -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="empDept" class="block mb-1 content-center">Department Type<span
                            class="text-red-500">*</span>:</label>
                    <select v-model="Type" id="empDept"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                        <option value="" disabled>Select Type</option>
                        <option value="HR">HR</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="MERN Stack Developer">MERN Stack Developer</option>

                    </select>
                </div>

                <!-- Address Block -->
                <div class="flex flex-row justify-between mx-20">
                    <label for="EmpBlock" class="block mb-1 content-center">Address/Block<span
                            class="text-red-500">*</span>:</label>
                    <select v-model="Address" id="EmpBlock"
                        class="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required>
                        <option value="" disabled>Select Address/Block</option>
                        <option value="Bhilai">Bhilai</option>
                        <option value="Durg">Durg</option>
                        <option value="Raipur">Raipur</option>
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
            alert("Successfull Added Department")
            this.$router.push('/'); // Redirect back to the main page after adding
        },
    },
};
</script>

<style scoped>
/* No additional scoped styles needed with Tailwind CSS */
</style>
