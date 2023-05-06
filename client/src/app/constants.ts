export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const apiRequests = {
  LOGIN: '/user/login',
  REGISTER: '/user/register',
  CURRENT: '/user/current',
  EMPLOYEES: '/employees',
  EMPLOYEE: '/employees',
  EMPLOYEE_EDIT: '/employees',
  EMPLOYEE_REMOVE: '/employees',
  EMPLOYEE_ADD: '/employees',
} as const;

export const LOGOUT_DISPATCH = 'LOGOUT' as const;
