import displayMessage from '../../ui/common/displayMessage.mjs';
import * as auth from '../../api/auth/index.js';
import * as storage from '../../services/storage.mjs';

export function loginListener() {
  const form = document.querySelector('form');

  if (form) {
    form.addEventListener('submit', handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const username = data.get('username');
  const password = data.get('password');

  const button = form.querySelector('button');
  button.innerText = 'Logging in...';

  const fieldset = form.querySelector('fieldset');
  fieldset.disabled = true;

  try {
    const bodyData = { username: username, password: password };
    const { token, firstName } = await auth.login(bodyData);
    storage.save('token', token);
    storage.save('name', firstName);
    location.href = '/dashboard';
  } catch (error) {
    console.error(error);
    displayMessage('danger', error, '#message');
  } finally {
    button.innerText = 'Login';
    fieldset.disabled = false;
  }
}
