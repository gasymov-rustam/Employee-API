import { apiRequests, methods } from '../constants';
import { api } from './api';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeGetAllResponse {
  message: string;
  data: Employee[];
}

export interface EmployeeUniqueResponse {
  message: string;
  data: Employee;
}

export interface EmployeeRemoveResponse {
  message: string;
  data: {
    id: string;
  };
}

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<EmployeeGetAllResponse, void>({
      query: () => ({
        url: apiRequests.EMPLOYEES,
        method: methods.GET,
      }),
      // providesTags: ['EmployeeUniqueResponse'],
    }),
    getEmployee: builder.query<EmployeeUniqueResponse, string>({
      query: (id) => ({
        url: `${apiRequests.EMPLOYEE}/${id}`,
        method: methods.GET,
      }),
    }),
    editEmployee: builder.mutation<EmployeeUniqueResponse, Employee>({
      query: (employee) => ({
        url: apiRequests.EMPLOYEE_EDIT,
        method: methods.PUT,
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<EmployeeRemoveResponse, string>({
      query: (id) => ({
        url: `${apiRequests.EMPLOYEE_REMOVE}/${id}`,
        method: methods.DELETE,
      }),
    }),
    addEmployee: builder.mutation<EmployeeUniqueResponse, Employee>({
      query: (employee) => ({
        url: apiRequests.EMPLOYEE_ADD,
        method: methods.POST,
        body: employee,
      }),
      /** for updating after add, should in general api add tag(array with response type) in get request that you want refetch add
       * providesTags: ['EmployeeUniqueResponse'](response type) and in after request mutation invalidatesTags: ['EmployeeUniqueResponse'] */
      // invalidatesTags: ['EmployeeUniqueResponse'],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
  useAddEmployeeMutation,
  endpoints: employeesEndpoints,
} = employeesApi;
