import {
  DialogActions,
  DialogContent,
  DialogTitle,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import classes from './Drawer.module.css';
import { ReactNode } from 'react';

interface DrawerProps {
  isDrawerOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

const Drawer = ({
  isDrawerOpen,
  handleClose,
  handleOpen,
  children,
  header,
  footer,
}: DrawerProps) => {
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
      {header && <DialogTitle>{header}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </SwipeableDrawer>
  );
};

export default Drawer;
