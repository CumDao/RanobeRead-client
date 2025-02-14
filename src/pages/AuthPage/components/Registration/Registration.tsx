import { useForm } from 'react-hook-form';
import { RegisterRequest } from '../../../../types/auth';
import classes from './Registration.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../../helpers/authSchema';
import { useAuth } from '../../../../store/auth';
import { Button, TextField, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

interface RegistrationForm extends RegisterRequest {
  repeatPassword: string;
}

const Registration = () => {
  const isLoading = useAuth.use.isLoading();
  const error = useAuth.use.error();
  const auth = useAuth.use.auth();
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const handleCaptcha = (token: string | null) => {
    setRecaptchaValue(token);
    setCaptchaError(null);
  };
  const onSubmit = (formData: RegistrationForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword: _unused, ...registrationData } = formData;
    if (recaptchaValue) {
      auth(registrationData as RegisterRequest, recaptchaValue);
    } else {
      setCaptchaError('Завершите reCAPTCHA');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    defaultValues: {
      email: '',
      login: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(registrationSchema),
  });
  return (
    <div className={classes.container}>
      <div>Через соцсети</div>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div>Через логин и пароль</div>
        <TextField
          id="outlined-basic"
          label="логин"
          variant="outlined"
          type="text"
          {...register('login')}
          error={!!errors.login}
          helperText={errors.login?.message}
        />
        <TextField
          label="email"
          variant="outlined"
          type="email"
          autoComplete="off"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="пароль"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="повторите пароль"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />
        {(captchaError || error) && (
          <Typography color="error" variant="body2">
            {captchaError || error}
          </Typography>
        )}
        <div className={classes.captcha}>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
            theme="light"
            onChange={handleCaptcha}
          />
        </div>
        <Button
          loading={isLoading}
          loadingPosition="center"
          color="info"
          variant="contained"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default Registration;
