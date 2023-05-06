import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Employee, employeesEndpoints } from '../../app/services/employee';

interface InitialState {
  employees: Employee[] | null;
}

const initialState: InitialState = {
  employees: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase('LOGOUT', (state) => {
        Object.assign(state, initialState);
      })
      .addMatcher(employeesEndpoints.getAllEmployees.matchFulfilled, (state, { payload }) => {
        state.employees = payload.data;
      });
  },
});

export const { actions: employeeActions, reducer: employeeReducer, name: employeeSliceName } = employeeSlice;

export const getAllEmployees = (state: RootState) => state.employees.employees;
