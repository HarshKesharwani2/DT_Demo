<template>
    <div>
        <h1>User List</h1>
        <button @click="loadUsers">Load Users</button>
        <div v-if="loading">Loading...</div>
        <div v-if="errorMessage">Error: {{ errorMessage }}</div>
        <ol v-for="user in users" :key="user.id">
            <li>{{ user.employee_name }}</li>
            <li>{{ user.employee_salary }}</li>
            <li>{{ user.employee_age }}</li>
            <li>{{ user.profile_image }}</li>
        </ol>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/index';

// Access the Pinia store
const userStore = useUserStore();

// Map state and getters
const users = computed(() => userStore.allUsers);
const loading = computed(() => userStore.isLoading);
const errorMessage = computed(() => userStore.errorMessage);

// Function to dispatch the fetchUsers action
const loadUsers = () => {
    userStore.fetchUsers();
};
</script>
