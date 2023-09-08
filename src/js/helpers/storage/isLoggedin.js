import * as storage from '../../services/storage.mjs';

export function isLoggedIn() {
    return storage.get('token') ? true : false;
}
