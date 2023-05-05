import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from '../../shared/router/router';
import { Home, Login, Register } from '../../pages';

const router = createBrowserRouter([
  {
    path: Paths.HOME,
    element: <Home />,
  },
  {
    path: Paths.LOGIN,
    element: <Login />,
  },
  {
    path: Paths.REGISTER,
    element: <Register />,
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
