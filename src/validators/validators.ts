import { body } from "express-validator";

export const registerValidate = [
  body('username').matches(/^[a-z0-9_]{3,15}$/)
  .withMessage(`The username must be 3-15 characters long\
 and can include lowercase letters, numbers, and underscores.`),

  body('password').matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
  .withMessage(`Password must be at least 8 characters long\
 and include at least one uppercase letter and one number.`)
];

export const updateUserValidate = [
  body('new_username')
  .optional()
  .matches(/^[a-z0-9_]{3,15}$/)
  .withMessage(`The username must be 3-15 characters long\
 and can include lowercase letters, numbers, and underscores.`),

  body('new_password')
  .optional()
  .matches(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
  .withMessage(`Password must be at least 8 characters long\
 and include at least one uppercase letter and one number.`)
];

export const updateVerseValidate = [
  body('surah')
  .isNumeric()
  .withMessage(`Surah must be a number.`),

  body('verse')
  .isNumeric()
  .withMessage(`Verse must be a number.`),

  body('note')
  .optional()
  .isString()
];