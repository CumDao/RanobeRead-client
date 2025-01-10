import { RouterProvider } from 'react-router-dom';
import routes from './utils/routes';
import Snowfall from 'react-snowfall';

const App = () => {
  return (
    <>
      <Snowfall style={{ zIndex: 1200 }} color="#964b00" />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
