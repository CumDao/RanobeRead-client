import { RouterProvider } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { ToastContainer } from 'react-toastify';

import theme from './theme';
import routes from './routes';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <RouterProvider router={routes} />
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
