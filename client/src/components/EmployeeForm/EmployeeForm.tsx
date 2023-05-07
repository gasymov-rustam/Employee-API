import { memo } from 'react';
import { Employee } from '../../app/services/employee';
import { Card, Form, Space } from 'antd';
import { Input } from '../Input';
import { Error } from '../Error';
import { Button } from '../Button';

interface EmployeeFormProps {
  btnText: string;
  title: string;
  error?: string;
  employee?: Employee;
  onFinish: (values: Employee) => void;
}

export const EmployeeForm = memo((props: EmployeeFormProps) => {
  const { btnText, title, error, employee, onFinish } = props;

  return (
    <Card title={title} style={{ width: '30rem' }}>
      <Form name='add-employee' onFinish={onFinish} initialValues={employee}>
        <Input type='text' name='firstName' placeholder='Name' />
        <Input name='lastName' placeholder='Surname' />
        <Input type='number' name='age' placeholder='Age' />
        <Input name='address' placeholder='Address' />

        <Space direction='vertical' size='large'>
          <Error message={error} />
          <Button htmlType='submit'>{btnText}</Button>
        </Space>
      </Form>
    </Card>
  );
});
