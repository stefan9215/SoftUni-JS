import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllFurniture() {
    return api.get('/data/catalog');
}

export async function createFurniture(data) {
    return api.post('/data/catalog', data);
}

export async function details(id) {
    return api.get('/data/catalog/' + id);
}

export async function updateFurniture(id,data) {
    return api.put('/data/catalog/' + id, data);
}

export async function deleteFurniture(id) {
    return api.del('/data/catalog/' + id);
}

export async function getMyFurniture(id) {
    return api.get(`/data/catalog?where=_ownerId%3D%22${id}%22`);
}
