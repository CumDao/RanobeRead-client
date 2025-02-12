import { yupResolver } from '@hookform/resolvers/yup';
import { LoginRequest } from '../../../../types/auth';
import classes from './Login.module.css';
import { loginSchema } from '../../../../helpers/authSchema';
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../../../../store/auth';

const Login = () => {
  const isLoading = useAuth.use.isLoading();
  const error = useAuth.use.error();
  const auth = useAuth.use.auth();
  const onSubmit = (loginData: LoginRequest) => {
    auth(loginData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className={classes.container}>
      <div>Через соцсети</div>
      <form autoComplete="off" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div>Через логин и пароль</div>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          autoComplete="off"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
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
