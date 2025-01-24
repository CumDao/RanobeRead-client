import { RouterProvider } from 'react-router-dom';
import routes from './utils/routes';
import { Provider } from 'react-redux';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { store } from './redux/store';
import theme from './theme';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme} defaultMode="system">
          <CssBaseline />
          <RouterProvider router={routes} />
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
