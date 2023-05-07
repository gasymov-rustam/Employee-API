import { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row } from 'antd';
import { EmployeeForm, Layout } from '../../components';
import { Employee, useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/services/employee';
import { Paths, isErrorWithMessage } from '../../shared';

interface EditEmployeeProps {}

export const EditEmployee = memo((props: EditEmployeeProps) => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const [error, setError] = useState('');
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [editEmployee] = useEditEmployeeMutation();

  const handleEditUser = useCallback(
    async (employee: Employee) => {
      try {
        const editedEmployee = {
          ...data,
          ...employee,
        };

        await editEmployee(editedEmployee).unwrap();

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
    [data, editEmployee, navigate]
  );

  if (isLoading) {
    return <span>Loading</span>;
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          onFinish={handleEditUser}
          title='Edit Employee'
          employee={data?.data}
          btnText='Edit'
          error={error}
        />
      </Row>
    </Layout>
  );
});
