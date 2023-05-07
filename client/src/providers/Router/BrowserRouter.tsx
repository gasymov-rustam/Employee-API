import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Paths } from '../../shared/router/router';
import { AddEmployee, EditEmployee, Employee, Home, Login, Register, Status } from '../../pages';

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
  {
    path: Paths.EMPLOYEE_ADD,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.EMPLOYEE}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.EMPLOYEE_EDIT}/:id`,
    element: <EditEmployee />,
  },
  {
    path: `${Paths.STATUS}/:status`,
    element: <Status />,
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
