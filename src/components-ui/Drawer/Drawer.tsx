import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import classes from './Drawer.module.css';
import { ReactNode } from 'react';

interface DrawerProps {
  isDrawerOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  children: ReactNode;
}

const Drawer = ({ isDrawerOpen, handleClose, handleOpen, children }: DrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <SwipeableDrawer
      anchor="right"
      open={isDrawerOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      allowSwipeInChildren={true}
      swipeAreaWidth={isMobile ? 25 : 0}
      ModalProps={{
        keepMounted: true,
        disableScrollLock: true,
      }}
      className={classes.drawer}
      classes={{
        paper: classes.paper,
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default Drawer;
