import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '../../../../types/auth';
import classes from './Login.module.css';
import { loginSchema } from '../../../../helpers/authSchema';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../../../../store/auth';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const isLoading = useAuth.use.isLoading();
  const error = useAuth.use.error();
  const auth = useAuth.use.auth();
  const handleCaptcha = (token: string | null) => {
    setRecaptchaValue(token);
    setCaptchaError(null);
  };
  const onSubmit = (loginData: LoginRequest) => {
    if (recaptchaValue) {
      auth(loginData, recaptchaValue);
      captchaRef.current?.reset();
    } else {
      setCaptchaError('Завершите reCAPTCHA');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      loginOrEmail: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
    shouldUnregister: false,
  });

  return (
    <div className={classes.container}>
      <div>Через соцсети</div>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div>Через логин/почту и пароль</div>
        <TextField
          label="email или логин"
          variant="outlined"
          type="text"
          autoComplete="off"
          {...register('loginOrEmail')}
          error={!!errors.loginOrEmail}
          helperText={errors.loginOrEmail?.message}
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
        {(captchaError || error) && (
          <Typography color="error" variant="body2">
            {captchaError || error}
          </Typography>
        )}
        <div className={classes.captcha}>
          <ReCAPTCHA
            ref={captchaRef}
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
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Login;
