export function isValidEmail(email) {
  const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  return emailRegex.test(email);
}
