import { Button, ButtonProps } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../store/auth';

const LogOutButton = ({ className, ...props }: ButtonProps) => {
  const signOut = useAuth.use.signOut();
  const handleAuth = () => {
    signOut();
  };
  return (
    <Button
      onClick={handleAuth}
      size="small"
      color="error"
      variant="contained"
      className={className}
      startIcon={<LogoutIcon />}
      {...props}
    >
      Выход из аккаунта
    </Button>
  );
};

export default LogOutButton;
