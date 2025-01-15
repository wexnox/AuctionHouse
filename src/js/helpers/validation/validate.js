const PASSWORD_MIN_LENGTH = 6;
const HAS_NUMBER_PATTERN = /\d/;
const HAS_UPPERCASE_PATTERN = /[A-Z]/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function testPasswordRequirement(password, pattern) {
    return pattern.test(password);
}

export function validate(password) {
    if (password.length < PASSWORD_MIN_LENGTH) {
        return false;
    }
    if (!testPasswordRequirement(password, HAS_NUMBER_PATTERN)) {
        return false;
    }
    if (!testPasswordRequirement(password, HAS_UPPERCASE_PATTERN)) {
        return false;
    }
    return true;
}

export function validateEmail(email) {
    return testPasswordRequirement(email, EMAIL_PATTERN);
}