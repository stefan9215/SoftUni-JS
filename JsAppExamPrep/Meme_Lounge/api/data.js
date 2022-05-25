import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getMemes() {
    return await api.get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(data) {
    return api.post('/data/memes',data);
}

export async function getMemeById(id) {
    return await api.get('/data/memes/' + id);
}
export async function deleteMeme(id) {
    return await api.del('/data/memes/' + id);
}

export async function getMyMemes(userId) {
    return await api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function editMeme(id,data) {
    return await api.put('/data/memes/' + id, data);
}