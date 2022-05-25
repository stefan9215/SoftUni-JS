import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
    return await api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function create(data) {
    return await api.post('/data/cars', data);
}

export async function getById(id) {
    return await api.get('/data/cars/' + id);
}

export async function update(id, data) {
    return await api.put('/data/cars/' + id, data);
}

export async function deleteCar(id) {
    return await api.del('/data/cars/' + id);
}

export async function getMyCars(userId) {
    return await api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function search(query) {
    return await api.get(`/data/cars?where=year%3D${query}`);
}
