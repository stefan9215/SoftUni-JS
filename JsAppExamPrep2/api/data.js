import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllBooks() {
    return await api.get('/data/books?sortBy=_createdOn%20desc');
}

export async function getBooksById(id) {
    return await api.get('/data/books/' + id);
}

export async function createBook(data) {
    return await api.post('/data/books', data);
}

export async function updateBook(id, data) {
    return await api.put('/data/books/' + id, data);
}

export async function deleteBook(id) {
    return await api.del('/data/books/' + id);
}

export async function getMyBooks(userId) {
    return await api.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getLikesById(id) {
    return await api.get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

export async function likeBook(data) {
    return await api.post('/data/likes',data);
}

export async function getLikesByUser(userId, bookId) {
    return await api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}