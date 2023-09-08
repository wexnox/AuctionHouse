/**
 * This function checks if an email address is valid according to a simple pattern.
 * Note: Email validation can be complex and this function only checks for a common pattern, not all valid email formats.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} true if the email address is valid according to the pattern, false otherwise
 */
export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}
