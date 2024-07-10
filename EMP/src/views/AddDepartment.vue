<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 flex items-center p-6">
        <div class="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-4">Add Department</h2>
            <!-- Form for adding department -->
            <form @submit.prevent="submitForm" class="space-y-4">
                <!-- Department Name -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="deptName" class="block mb-1 md:mb-0 md:mr-4">Department Name<span
                            class="text-red-500">*</span>:</label>
                    <input v-model="departmentName" id="deptName" type="text" placeholder="Enter department name"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                </div>

                <!-- Department Type -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="deptType" class="block mb-1 md:mb-0 md:mr-4">Department Type<span
                            class="text-red-500">*</span>:</label>
                    <select v-model="type" id="deptType"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                        <option value="" disabled>Select Type</option>
                        <option value="HR">HR</option>
                        <option value="Software Developer">Software Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="MERN Stack Developer">MERN Stack Developer</option>
                    </select>
                </div>

                <!-- Address Block -->
                <div class="flex flex-col md:flex-row justify-between items-center mx-4">
                    <label for="deptAddress" class="block mb-1 md:mb-0 md:mr-4">Address/Block<span
                            class="text-red-500">*</span>:</label>
                    <select v-model="address" id="deptAddress"
                        class="w-full md:w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        required>
                        <option value="" disabled>Select Address/Block</option>
                        <option value="Bhilai">Bhilai</option>
                        <option value="Durg">Durg</option>
                        <option value="Raipur">Raipur</option>
                    </select>
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
export default {
    data() {
        return {
            departmentName: '',
            type: '',
            address: '',
        };
    },
    methods: {
        submitForm() {
            alert("Department added successfully!");
            this.$router.push('/'); // Redirect back to the main page after adding
        },
    },
};
</script>

<style scoped></style>
