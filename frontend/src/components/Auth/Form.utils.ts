export const validateName = (formField: string): boolean => {
  return formField.length > 0;
};

export const validatePassword = (password: string): boolean => {
  const checkUpperCase = /[A-Z]/.test(password);
  const checkLowerCase = /[a-z]/.test(password);
  const checkNumber = /\d+/.test(password);
  const checkSpecialChar = /\!|\?|\*|\^|\%|\(|\)|-/.test(password);
  return checkUpperCase && checkLowerCase && checkNumber && checkSpecialChar && password.length >= 8;
};

export const validateEmail = (email: string): boolean => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
