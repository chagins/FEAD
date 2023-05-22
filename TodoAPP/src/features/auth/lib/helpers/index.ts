import validator from 'validator';

const passwordMinLength = 6;

const passwordOptions = {
  minLength: 6,
  minLowercase: 0,
  minUppercase: 0,
  minNumbers: 0,
  minSymbols: 0,
};

const validateObjects = {
  email: {
    check: validator.isEmail,
    invalidText: 'Incorrect email',
  },
  password: {
    minLength: 6,
    check: (value: string) => validator.isStrongPassword(value, { ...passwordOptions }),
    invalidText: `password must be at least ${passwordMinLength} characters`,
  },
};

export const isValidField = (type: keyof typeof validateObjects, value: string) => {
  return validateObjects[type].check(value);
};

export const getInvalidMessage = (type: keyof typeof validateObjects) => {
  return validateObjects[type].invalidText;
};
