import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAll() {
    return await api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getById(albumId) {
    return await api.get('/data/albums/' + albumId);
}

export async function createSong(data) {
    return await api.post('/data/albums', data);
}

export async function deleteAlbum(id) {
    return await api.del('/data/albums/' + id);
}

export async function updateAlbum(id, data) {
    return await api.put('/data/albums/' + id, data);
}

export async function searchAlbum(query) {
    return await api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}