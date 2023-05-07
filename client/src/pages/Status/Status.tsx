import { Button, Result, Row } from 'antd';
import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Paths } from '../../shared';

const Statuses: Record<string, string> = {
  created: 'User successfully created',
  updated: 'User successfully updated',
  deleted: 'User successfully deleted',
};

export const Status = memo(() => {
  const { status } = useParams();

  return (
    <Row align='middle' justify='center' style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'Not Found'}
        extra={
          <Button key='dashboard'>
            <Link to={Paths.HOME}>Home</Link>
          </Button>
        }
      />
    </Row>
  );
});
