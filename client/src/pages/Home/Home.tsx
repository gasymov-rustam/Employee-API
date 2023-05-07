import { memo } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Layout, Table } from '../../components';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../shared';

interface HomeProps {}

export const Home = memo((props: HomeProps) => {
  const navigate = useNavigate();
  const gotToAddUser = () => navigate(Paths.EMPLOYEE_ADD);

  return (
    <Layout>
      <Button type='primary' onClick={gotToAddUser} icon={<PlusCircleOutlined />}>
        Add employee
      </Button>

      <Table />
    </Layout>
  );
});
