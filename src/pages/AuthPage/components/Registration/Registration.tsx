import { useForm } from 'react-hook-form';
import { RegisterRequest } from '../../../../types/auth';
import classes from './Registration.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '../../../../helpers/authSchema';
import { useAuth } from '../../../../store/auth';
import { Button, TextField, Typography } from '@mui/material';

const Registration = () => {
  const isLoading = useAuth.use.isLoading();
  const error = useAuth.use.error();
  const auth = useAuth.use.auth();
  const onSubmit = (registrationData: RegisterRequest) => {
    auth(registrationData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      email: '',
      login: '',
      password: '',
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
          label="Логин"
          variant="outlined"
          type="text"
          {...register('login')}
          error={!!errors.login}
          helperText={errors.login?.message}
        />
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
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default Registration;
