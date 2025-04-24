import { API_MAIN_URL } from '../constants.js';
import { authFetch } from '../api.js';
import { displayMessage } from '../../ui/common/displayMessage.js';

export async function register(userProfile) {
  const endpoint = '/auth/register';
  const registerURL = `${API_MAIN_URL}${endpoint}`;

  // console.log(`The API URL is: ${registerURL}`);
  // console.log(`User Profile Sent: ${JSON.stringify(userProfile)}`);
  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  if (!emailRegex.test(userProfile.email)) {
    return displayMessage('danger', 'Registration is only available for noroff.no or stud.noroff.no email addresses');
  }

  try {

    const { data, error } = await authFetch(registerURL, {
      method: 'POST', body: JSON.stringify(userProfile),
    });
    if (error) {
      displayMessage('danger', `Failed: ${error.message}`);
      throw new Error(error);
    }

    console.log(data.errors);
    console.log(data);

    if (data.status === 400 && data.errors[0].message === 'Profile already exists') {
      return displayMessage('danger', 'Profile already exists. Please use a different email.');
    }

    if (data.status >= 200 && data.status < 300) {
      location.href = 'pages/profile/index.html';
    } else {
      console.log('Unexpected response status:', data.status);
      displayMessage('danger', 'Unexpected error occurred. Please try again later.');
    }
    return data;
  } catch (error) {
    return displayMessage('danger', error.message);
  }
}