import { Button, ButtonProps } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';

const AuthButton = ({ className, ...props }: ButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setPrevUrl = useAuth.use.setPrevUrl();
  const handleAuth = () => {
    setPrevUrl(location.pathname);
    navigate('/auth');
  };
  return (
    <Button
      onClick={handleAuth}
      size="small"
      color="info"
      variant="contained"
      className={className}
      endIcon={<LoginIcon />}
      {...props}
    >
      Вход | Регистрация
    </Button>
  );
};

export default AuthButton;
