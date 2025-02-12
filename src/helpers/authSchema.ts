import * as yup from 'yup';

const regEmail = new RegExp(/^\S+@\S+\.\S+$/);
const regPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/);

export const registrationSchema = yup.object().shape({
  login: yup.string().trim().required('Логин обязателен!').min(3, 'Минимальная длина - 3 символа.'),
  email: yup
    .string()
    .trim()
    .required('Email обязателен!')
    .matches(regEmail, 'Введенное значение не соответствует формату email.'),
  password: yup
    .string()
    .trim()
    .required('Пароль обязателен!')
    .min(6, 'Минимальная длина - 6 символов.')
    .matches(
      regPassword,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру',
    ),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email обязателен!')
    .matches(regEmail, 'Введенное значение не соответствует формату email.'),
  password: yup
    .string()
    .trim()
    .required('Пароль обязателен!')
    .min(6, 'Минимальная длина - 6 символов.'),
});
