<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 flex flex-col items-center p-6">
        <div class="border-2 border-black rounded-sm w-full p-6">
            <!-- Header -->
            <div class="w-full flex justify-between items-center mb-4 border-2 p-2 border-black">
                <div class="flex items-center">
                    <p class="text-xl font-bold">Logo</p>
                </div>
                <h1 class="text-2xl font-bold">Employee Search</h1>
            </div>

            <!-- Search Form -->
            <div class="flex flex-col gap-4 mb-4">
                <div class="flex flex-row space-x-6 items-center justify-center mx-20">
                    <label for="employeeId" class="mb-1">Employee ID</label>
                    <input v-model="employeeId" id="employeeId" type="text" placeholder="Employee ID"
                        class="border p-2 rounded">
                    <button @click="search" class="bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                </div>

                <div class="flex space-x-6 justify-center mb-4 mx-20">
                    <button @click="addEmployee" class="bg-green-500 text-white py-2 px-4 rounded">Add Employee</button>
                    <button @click="addDepartment" class="bg-yellow-500 text-white py-2 px-4 rounded">Add Dept</button>
                </div>
            </div>

            <!-- Data Table -->
            <table class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border">Id</th>
                        <th class="py-2 px-4 border">Employee Name</th>
                        <th class="py-2 px-4 border">Salary</th>
                        <th class="py-2 px-4 border">Age</th>
                        <th class="py-2 px-4 border">Profile Image</th>
                        <th class="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in paginatedEmployees" :key="index">
                        <td class="py-2 px-4 border">{{ employee.id }}</td>
                        <td class="py-2 px-4 border">{{ employee.employee_name }}</td>
                        <td class="py-2 px-4 border">{{ employee.employee_salary }}</td>
                        <td class="py-2 px-4 border">{{ employee.employee_age }}</td>
                        <td class="py-2 px-4 border">{{ employee.profile_image }}</td>
                        <td class="py-2 px-1 border flex justify-center items-center">
                            <button @click="viewEmployee(employee)"
                                class="bg-blue-500 text-white py-1 px-2 rounded mx-2">View</button>
                            <button @click="editEmployee(employee)"
                                class="bg-yellow-500 text-white py-1 px-2 rounded mx-2">Edit</button>
                            <button @click="deleteEmployee(employee)"
                                class="bg-red-500 text-white py-1 px-2 rounded mx-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination -->
            <div class="flex justify-center mt-4">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                    class="mx-1 bg-blue-500 text-white py-1 px-3 rounded">{{ page }}</button>
            </div>
        </div>
        <div class="border-2 border-black min-w-full border-t-0 flex justify-center items-center">
            <p>&copy; Copyright 2024</p>
        </div>

        <!-- View Modal -->
        <div v-if="showViewModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Employee Details</h3>
                <p><strong>Name:</strong> {{ selectedEmployee.employee_name }}</p>
                <p><strong>Salary:</strong> {{ selectedEmployee.employee_salary }}</p>
                <p><strong>Age:</strong> {{ selectedEmployee.employee_age }}</p>
                <p><strong>Profile Image:</strong> {{ selectedEmployee.profile_image }}</p>
                <div class="text-center mt-4">
                    <button @click="closeModal" class="bg-red-500 text-white py-2 px-4 rounded">Close</button>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Edit Employee</h3>
                <div class="mb-4">
                    <label for="editName" class="block mb-1">Name</label>
                    <input v-model="editForm.employee_name" id="editName" type="text" class="border p-2 rounded w-full">
                </div>
                <div class="mb-4">
                    <label for="editSalary" class="block mb-1">Salary</label>
                    <input v-model="editForm.employee_salary" id="editSalary" type="text"
                        class="border p-2 rounded w-full">
                </div>
                <div class="mb-4">
                    <label for="editAge" class="block mb-1">Age</label>
                    <input v-model="editForm.employee_age" id="editAge" type="text" class="border p-2 rounded w-full">
                </div>
                <div class="mb-4">
                    <label for="editProfileImage" class="block mb-1">Profile Image</label>
                    <input v-model="editForm.profile_image" id="editProfileImage" type="text"
                        class="border p-2 rounded w-full">
                </div>
                <div class="text-center mt-4">
                    <button @click="saveEmployee" class="bg-green-500 text-white py-2 px-4 rounded m-1">Save</button>
                    <button @click="closeModal" class="bg-red-500 text-white py-2 px-4 rounded m-1">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../stores/index';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

// Local state for the component
const employeeId = ref('');

const currentPage = ref(1);
const pageSize = 5;

const showViewModal = ref(false);
const showEditModal = ref(false);

const selectedEmployee = ref(null);
const editForm = ref({
    employee_name: '',
    employee_salary: '',
    employee_age: '',
    profile_image: ''
});

// Computed properties
const employees = computed(() => userStore.allUsers);
const filteredEmployees = ref([]);

const paginatedEmployees = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return filteredEmployees.value.slice(start, end);
});

const totalPages = computed(() => {
    return Math.ceil(filteredEmployees.value.length / pageSize);
});

// Fetch employees when component is mounted
onMounted(async () => {
    await userStore.fetchUsers();
    filteredEmployees.value = employees.value;
});

// Methods
const search = (employeeId) => {
    if (!employeeId) {
        // Handle the case where employeeId is undefined or null
        filteredEmployees.value = employees.value;
        currentPage.value = 1; // Reset to first page
        return;
    }

    console.log('Search initiated with employeeId:', employeeId);

    const searchIdStr = employeeId.toString().toLowerCase(); // Convert to string safely

    filteredEmployees.value = employees.value.filter(employee => {
        const empIdStr = employee.id.toString().toLowerCase();
        const matches = empIdStr.includes(searchIdStr);

        console.log('Checking employee:', employee);
        console.log('empIdStr:', empIdStr, 'searchIdStr:', searchIdStr, 'matches:', matches);

        return matches;
    });

    currentPage.value = 1; // Reset to first page after search
    console.log('Filtered employees:', filteredEmployees.value);
};

const addEmployee = () => {
    router.push('/AddEmployee');
};

const addDepartment = () => {
    router.push('/AddDepartment');
};

const viewEmployee = (employee) => {
    selectedEmployee.value = employee;
    showViewModal.value = true;
};

const editEmployee = (employee) => {
    selectedEmployee.value = employee;
    editForm.value = { ...employee };
    showEditModal.value = true;
};

const deleteEmployee = async (employee) => {
    // console.log("hello world");
    console.log(employee);
    if (confirm("Are you sure?")) {
        try {
            // selectedEmployee.value = employee;
            console.log(employee.id);
            await userStore.deleteUser(employee.id);
            console.log("harsh");
            closeModal();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    }
};

const saveEmployee = async () => {
    try {
        await userStore.updateUser(selectedEmployee.value.id, editForm.value);
        closeModal();
    } catch (error) {
        console.error('Error saving employee:', error);
    }
};

const closeModal = () => {
    showViewModal.value = false;
    showEditModal.value = false;
};
</script>


<style scoped>
/* Add any additional styling if necessary */
</style>
