import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import theme from './theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme} defaultMode="system">
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </>
  );
};

export default App;
