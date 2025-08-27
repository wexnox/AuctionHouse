/**
 * Validates an email address.
 * @param email
 * @returns {boolean}
 */
// TODO: check if this is still needed
export function isValidEmail(email) {
  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  return emailRegex.test(email);
}
