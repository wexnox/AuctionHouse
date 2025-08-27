import {API_MAIN_URL} from '../constants.js';
import {authFetch} from '../api.js';
import {getTokenFromStorage} from '../../helpers/storage.js';

const action = '/profiles';
const method = 'PUT';

/**
 * Updates the user's avatar.
 * @param userData
 * @returns {Promise<any>}
 */
export async function updateUserAvatar(userData) {
  const user = getTokenFromStorage('profile');
  const userName = user.name;
  const updateAvatarURL = `${API_MAIN_URL}${action}/${userName}/media`;

  console.log(`Attempting to update avatar for user: ${userName}`);

  if (!user) {
    throw new Error('This requires a valid user!');
  }

  const response = await authFetch(updateAvatarURL, {
    method,
    body: JSON.stringify({avatar: userData.avatar}),
  });
  console.log('Server response: ', response);

  if (response.ok) {
    let responseJson = await response.json();
    console.log('Server response JSON: ', responseJson);
    return responseJson;
  } else {
    // If the server response is not OK, then throw an error
    console.error(`Server responded with status: ${response.status}`);
    // If the server response is not OK, then throw an error
    throw new Error(`Server responded with status: ${response.status}`);
  }
}
