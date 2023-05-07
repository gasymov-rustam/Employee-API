import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../../features/auth/authSlice';
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/services/employee';
import { Paths, isErrorWithMessage } from '../../shared';
import { Button, Layout } from '../../components';
import { Descriptions, Divider, Modal, Space } from 'antd';
import { Error } from '../../components/Error';

interface EmployeeProps {}

export const Employee = memo((props: EmployeeProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const params = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetEmployeeQuery(params.id || '');
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(getCurrentUser);

  const showModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleDeleteUser = useCallback(async () => {
    if (!data?.data.id) return;

    try {
      await removeEmployee(data?.data.id).unwrap();

      navigate(`${Paths.STATUS}/deleted`);
      showModal();
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  }, [data?.data.id, navigate, removeEmployee, showModal]);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (!data?.data || !user) {
    return <Navigate to={Paths.HOME} />;
  }

  const employeeData = data.data;

  return (
    <Layout>
      <Descriptions title='Information about employee' bordered>
        <Descriptions.Item
          label='Имя'
          span={3}
        >{`${employeeData.firstName} ${employeeData.lastName}`}</Descriptions.Item>

        <Descriptions.Item label='Age' span={3}>
          {employeeData.age}
        </Descriptions.Item>

        <Descriptions.Item label='Address' span={3}>
          {employeeData.address}
        </Descriptions.Item>
      </Descriptions>

      {user?.id === employeeData.userId && (
        <>
          <Divider orientation='left'>Actions</Divider>
          <Space>
            <Link to={`${Paths.EMPLOYEE_EDIT}/${employeeData.id}`}>
              <Button shape='round' type='default' icon={<EditOutlined />}>
                Edit
              </Button>
            </Link>
            <Button shape='round' danger onClick={showModal} icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Space>
        </>
      )}
      <Error message={error} />

      <Modal
        title='Confirm delete'
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={showModal}
        okText='Ok'
        cancelText='Cancel'
      >
        Do you really want to delete this employee?
      </Modal>
    </Layout>
  );
});
