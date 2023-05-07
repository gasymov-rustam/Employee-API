import { memo } from 'react';
import { Table as AntTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Employee, useGetAllEmployeesQuery } from '../../app/services/employee';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../shared';

const columns: ColumnsType<Employee> = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export const Table = memo(() => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllEmployeesQuery();

  const handleClick = (row: Employee) => ({
    onClick: () => {
      navigate(`${Paths.EMPLOYEE}/${row.id}`);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return null;

  return (
    <AntTable
      loading={isLoading}
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data.data}
      pagination={false}
      onRow={handleClick}
    />
  );
});
