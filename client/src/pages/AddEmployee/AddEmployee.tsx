import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee, useAddEmployeeMutation } from '../../app/services/employee';
import { Paths, isErrorWithMessage } from '../../shared';
import { EmployeeForm, Layout } from '../../components';
import { Row } from 'antd';

export const AddEmployee = memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [addEmployee] = useAddEmployeeMutation();

  const handleAddEmployee = useCallback(
    async (data: Employee) => {
      try {
        await addEmployee(data).unwrap();

        navigate(`${Paths.STATUS}/created`);
      } catch (err) {
        const maybeError = isErrorWithMessage(err);

        if (maybeError) {
          setError(err.data.message);
        } else {
          setError('Something went wrong');
        }
      }
    },
    [addEmployee, navigate]
  );

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm title='Add Employee' btnText='Add' error={error} onFinish={handleAddEmployee} />
      </Row>
    </Layout>
  );
});
