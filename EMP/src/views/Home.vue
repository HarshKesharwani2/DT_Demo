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
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex flex-row justify-between mx-20">
                    <label for="employeeName" class="mb-1 content-center">Employee Name</label>
                    <input v-model="employeeName" id="employeeName" type="text" placeholder="Employee name"
                        class="border p-2 rounded">
                </div>
                <div class="flex flex-row justify-between mx-20">
                    <label for="mobile" class="mb-1 content-center">Mobile</label>
                    <input v-model="mobile" id="mobile" type="text" placeholder="Mobile" class="border p-2 rounded">
                </div>
                <div class="flex flex-row justify-between mx-20">
                    <label for="email" class="mb-1 content-center">Email</label>
                    <input v-model="email" id="email" type="email" placeholder="Email" class="border p-2 rounded">
                </div>
                <div class="flex flex-row justify-between mx-20">
                    <label for="department" class="mb-1 content-center">Department</label>
                    <select v-model="department" id="department" class="border p-2 px-5 rounded">
                        <option value="" disabled selected>Select Department</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-between mb-4 mx-80">
                <button @click="search" class="bg-blue-500 text-white py-2 px-4 rounded">Search</button>
                <button @click="addEmployee" class="bg-green-500 text-white py-2 px-4 rounded">Add Employee</button>
                <button @click="addDepartment" class="bg-yellow-500 text-white py-2 px-4 rounded">Add Dept</button>
            </div>

            <!-- Data Table -->
            <table class="min-w-full bg-white">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border">emp_name</th>
                        <th class="py-2 px-4 border">department</th>
                        <th class="py-2 px-4 border">mobile</th>
                        <th class="py-2 px-4 border">email</th>
                        <th class="py-2 px-4 border">action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in paginatedEmployees" :key="index">
                        <td class="py-2 px-4 border">{{ employee.name }}</td>
                        <td class="py-2 px-4 border">{{ employee.department }}</td>
                        <td class="py-2 px-4 border">{{ employee.mobile }}</td>
                        <td class="py-2 px-4 border">{{ employee.email }}</td>
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
        <div class="border-2 border-black min-w-full border-t-0 flex justify-center item-center">
            <p>&copy; Copyright 2024</p>
        </div>

        <!-- View Modal -->
        <div v-if="showViewModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg max-w-lg w-full">
                <h3 class="text-xl font-bold mb-4">Employee Details</h3>
                <p><strong>Name:</strong> {{ selectedEmployee.name }}</p>
                <p><strong>Department:</strong> {{ selectedEmployee.department }}</p>
                <p><strong>Mobile:</strong> {{ selectedEmployee.mobile }}</p>
                <p><strong>Email:</strong> {{ selectedEmployee.email }}</p>
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
                    <input v-model="editForm.name" id="editName" type="text" class="border p-2 rounded w-full">
                </div>
                <div class="mb-4">
                    <label for="editDepartment" class="block mb-1">Department</label>
                    <select v-model="editForm.department" id="editDepartment" class="border p-2 rounded w-full">
                        <option value="" disabled>Select Department</option>
                        <option value="HR">HR</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="editMobile" class="block mb-1">Mobile</label>
                    <input v-model="editForm.mobile" id="editMobile" type="text" class="border p-2 rounded w-full">
                </div>
                <div class="mb-4">
                    <label for="editEmail" class="block mb-1">Email</label>
                    <input v-model="editForm.email" id="editEmail" type="email" class="border p-2 rounded w-full">
                </div>
                <div class="text-center mt-4">
                    <button @click="saveEmployee" class="bg-green-500 text-white py-2 px-4 rounded m-1">Save</button>
                    <button @click="closeModal" class="bg-red-500 text-white py-2 px-4 rounded m-1">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            employeeName: '',
            mobile: '',
            email: '',
            department: '',
            employees: [
                { name: 'John Doe', department: 'HR', mobile: '1234567890', email: 'john@example.com' },
                { name: 'Jane Smith', department: 'Engineering', mobile: '0987654321', email: 'Smith@example.com' },
                { name: 'Monkey D Luffy', department: 'Engineering', mobile: '0987654321', email: 'Luffy@example.com' },
                { name: 'Batman', department: 'Engineering', mobile: '0987654321', email: 'Batman@example.com' },
                { name: 'Naruto Usumaki', department: 'Engineering', mobile: '0987654321', email: 'Usumaki@example.com' },
                { name: 'Goku', department: 'Engineering', mobile: '0987654321', email: 'Goku@example.com' },
            ],
            filteredEmployees: [],
            currentPage: 1,
            pageSize: 5,
            showViewModal: false,
            showEditModal: false,
            selectedEmployee: null,
            editForm: {
                name: '',
                department: '',
                mobile: '',
                email: ''
            }
        };
    },
    computed: {
        paginatedEmployees() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredEmployees.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredEmployees.length / this.pageSize);
        },
    },
    mounted() {
        this.filteredEmployees = this.employees;
    },
    methods: {
        search() {
            this.filteredEmployees = this.employees.filter(employee => {
                return (
                    (!this.employeeName || employee.name.toLowerCase().includes(this.employeeName.toLowerCase())) &&
                    (!this.mobile || employee.mobile.includes(this.mobile)) &&
                    (!this.email || employee.email.toLowerCase().includes(this.email.toLowerCase())) &&
                    (!this.department || employee.department === this.department)
                );
            });
            this.currentPage = 1; // Reset to first page after search
        },
        addEmployee() {
            this.$router.push('/AddEmployee');
        },
        addDepartment() {
            this.$router.push('/AddDepartment');
        },
        viewEmployee(employee) {
            this.selectedEmployee = employee;
            this.showViewModal = true;
        },
        editEmployee(employee) {
            this.selectedEmployee = employee;
            this.editForm = { ...employee };
            this.showEditModal = true;
        },
        deleteEmployee(employee) {
            if (confirm("Are you sure?") == true) {
                this.employees = this.employees.filter(emp => emp !== employee);
                this.filteredEmployees = this.employees;
            } else {
                text = "You canceled!";
            }
        },
        saveEmployee() {
            Object.assign(this.selectedEmployee, this.editForm);
            this.showEditModal = false;
        },
        closeModal() {
            this.showViewModal = false;
            this.showEditModal = false;
        },
    },
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>
