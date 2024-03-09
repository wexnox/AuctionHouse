/**
 * This function checks if a password is valid according to the following rules:
 * - It must be at least 6 characters long
 * - It must contain at least one number
 * - It must contain at least one uppercase letter
 *
 * @param {string} password - The password to validate
 * @returns {boolean} true if the password is valid according to the rules, false otherwise
 */
export function validatePassword(password) {
  // Check for minimum length
  if (password.length < 6) {
    return false;
  }

  // Check for at least one number
  const hasNumber = /\d/;
  if (!hasNumber.test(password)) {
    return false;
  }

  // Check for at least one capital letter
  const hasUpperCase = /[A-Z]/;
  if (!hasUpperCase.test(password)) {
    return false;
  }

  return true;
}
