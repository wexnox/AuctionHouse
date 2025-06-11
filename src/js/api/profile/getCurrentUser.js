import { API_PROFILE_URL } from '../constants.js';
import { getTokenFromStorage } from '../../helpers/storage.js';
import { authFetch } from '../api.js';
import { handleHttpError } from '../handleErrors.js';

export async function getCurrentUserProfile() {

  const token = getTokenFromStorage('accessToken');
  const userProfile = getTokenFromStorage('profile');

  if (!token) {
    throw new Error('You must be logged in');
  }

  if (!userProfile || !userProfile.name) {
    throw new Error('User profile not found in storage');
  }
  try {
    const profileURL = `${API_PROFILE_URL}/${userProfile.name}`;
    const response = await authFetch(profileURL, {
      method: 'GET',
    });

    handleHttpError(response);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}