import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
    return await api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function catalogGames() {
    return await api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function getGameById(gameId) {
    return await api.get('/data/games/' + gameId);
}

export async function createGame(data) {
    return await api.post('/data/games', data);
}

export async function editGame(gameId, data) {
    return await api.put('/data/games/' + gameId, data);
}

export async function deleteGame(gameId) {
    return await api.del('/data/games/' + gameId);
}

export async function getComments(id) {
    return await api.get(`/data/comments?where=gameId%3D%22${id}%22`);
}

export async function postComment(data) {
    return await api.post('/data/comments', data);
}
