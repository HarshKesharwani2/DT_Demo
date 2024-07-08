import { defineStore } from 'pinia';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../services/api';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        user: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchUsers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getUsers();
                this.users = response.data.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async fetchUser(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getUser(id);
                this.user = response.data.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async addUser(user) {
            this.loading = true;
            this.error = null;
            try {
                await createUser(user);
                await this.fetchUsers(); // Refresh the user list
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async updateUser(id, user) {
            this.loading = true;
            this.error = null;
            try {
                await updateUser(id, user);
                await this.fetchUsers(); // Refresh the user list
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        async deleteUser(id) {
            this.loading = true;
            this.error = null;
            try {
                await deleteUser(id);
                await this.fetchUsers(); // Refresh the user list
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
    },
    getters: {
        allUsers: (state) => state.users,
        singleUser: (state) => state.user,
        isLoading: (state) => state.loading,
        error: (state) => state.error,
    },
});
