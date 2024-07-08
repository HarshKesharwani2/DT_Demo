<template>
    <div>
        <h1>User List</h1>
        <button @click="loadUsers">Load Users</button>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error }}</div>
        <ul>
            <li v-for="user in users" :key="user.id">{{ user.employee_name }}</li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/index.js';

// Access the Pinia store
const userStore = useUserStore();

// Map state and getters
const users = computed(() => userStore.allUsers);
const loading = computed(() => userStore.isLoading);
const error = computed(() => userStore.error);

// Function to dispatch the fetchUsers action
const loadUsers = () => {
    userStore.fetchUsers();
};
</script>
