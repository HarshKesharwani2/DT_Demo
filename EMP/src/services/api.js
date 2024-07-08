import axios from 'axios';

const API_BASE_URL = 'https://dummy.restapiexample.com';

export const getUsers = () => {
    return axios.get(`${API_BASE_URL}/api/v1/employees`);
};

export const getUser = (id) => {
    return axios.get(`${API_BASE_URL}/api/v1/employee/${id}`);
};

export const createUser = (user) => {
    return axios.post(`${API_BASE_URL}/api/v1/create`, user);
};

export const updateUser = (id, user) => {
    return axios.put(`${API_BASE_URL}/api/v1/update/${id}`, user);
};

export const deleteUser = (id) => {
    return axios.delete(`${API_BASE_URL}/api/v1/delete/${id}`);
};
