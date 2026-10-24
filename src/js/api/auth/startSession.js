import * as storage from '../../helpers/storage.js';
import { login } from './login.js';
import { createApiKey } from './createApiKey.js';

/**
 * Logs in and stores the session (access token, profile and API key).
 * The access token must be stored before the API key is created, as the request is authorized with it.
 * @param credentials {{email: string, password: string}}
 * @returns {Promise<Object>} The logged in user
 */

export async function startSession(credentials) {
  const { accessToken, ...user } = await login(credentials);

  storage.saveTokenToStorage('accessToken', accessToken);
  storage.saveTokenToStorage('profile', user);

  const apiKey = await createApiKey();
  storage.saveTokenToStorage('apiKey', apiKey);

  return user;
}
