import { Box, Button, Container, Tab, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import classes from './AuthPage.module.css';
import Logo from '../../components-ui/Logo';
import Login from './components/Login';
import Registration from './components/Registration';
import { useAuth } from '../../store/auth';
import UserCard from '../../components-ui/UserCard';
import { PROJECT_NAME } from '../../constants/titles';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import ThemeChanger from '../../components/ThemeChanger';

const AuthPage = () => {
  const navigate = useNavigate();
  const prevUrl = useAuth.use.prevUrl();
  const user = useAuth.use.userData();
  const useClearError = useAuth.use.clearError();
  const [tab, setTab] = useState('1');
  const handleChangeTab = (_: SyntheticEvent, newTab: string) => {
    useClearError();
    setTab(newTab);
  };
  const useSignOut = useAuth.use.signOut();
  // TODO: костыль чтобы убирать оверлей капчи. убрать когда будет возможность
  useEffect(() => {
    return () => {
      const captchaOverlay = document.querySelector('body > div:nth-child(4)');
      captchaOverlay?.remove();
    };
  }, [tab]);

  const handleSuccess = () => {
    navigate(prevUrl);
  };
  const handleReject = () => {
    useSignOut();
  };

  return (
    <div className={classes.authContainer}>
      <div className={classes.themeChanger}>
        <ThemeChanger />
      </div>
      <div className={classes.authContent}>
        <div className={classes.authLogo}>
          <Logo />
          {PROJECT_NAME}
        </div>
        <Container className={classes.authCard}>
          {user ? (
            <>
              <UserCard login={user.login} avatarUrl={user.avatarUrl} />
              <div className={classes.actions}>
                <Button
                  className={clsx(classes.button, classes.success)}
                  variant="outlined"
                  color="success"
                  onClick={handleSuccess}
                >
                  <span>Продолжить как {user.login}</span>
                </Button>
                <Button
                  className={clsx(classes.button, classes.reject)}
                  variant="outlined"
                  color="inherit"
                  onClick={handleReject}
                >
                  Отменить
                </Button>
              </div>
            </>
          ) : (
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab className={classes.tabButton} label="Вход" value="1" />
                  <Tab className={classes.tabButton} label="Регистрация" value="2" />
                  <Tab className={classes.tabButton} label="Сброс пароля" value="3" />
                </TabList>
              </Box>
              <TabPanel className={classes.tabContent} value="1">
                <Login key={tab} />
              </TabPanel>
              <TabPanel className={classes.tabContent} value="2">
                <Registration key={tab} />
              </TabPanel>
              <TabPanel className={classes.tabContent} value="3">
                <Typography color="error">В разработке</Typography>
              </TabPanel>
            </TabContext>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AuthPage;
