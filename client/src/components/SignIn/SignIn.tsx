import { Card, Form, Row, Space, Typography, notification } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '../Button';
import { Input } from '../Input';
import { Error } from '../Error';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/auth/authSlice';
import { PasswordInput } from '../PasswordInput';
import { Paths, isErrorWithMessage } from '../../shared';
import { UserData, useLoginMutation } from '../../app/services/auth';

export const SignIn = memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const user = useAppSelector(getCurrentUser);
  const [loginUser, loginUserResult] = useLoginMutation();
  const [api, contextHolder] = notification.useNotification();

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      if (loginUserResult.isSuccess) {
        setError('');
      }

      api.success({
        message: 'Login',
        description: `Login: ${loginUserResult.data?.message}`,
        placement: 'bottomRight',
      });

      // navigate('/');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
        api.error({
          message: 'Login',
          description: err.data.message,
          placement: 'topRight',
        });
      } else {
        api.error({
          message: 'Login',
          description: 'Something went wrong',
          placement: 'bottomRight',
        });
        setError('Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      {contextHolder}
      <Row align='middle' justify='center'>
        <Card title='Enter' style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <Input type='email' name='email' placeholder='Email' />
            <PasswordInput name='password' placeholder='Password' />

            <Button type='primary' htmlType='submit' loading={loginUserResult.isLoading}>
              Enter
            </Button>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              Don`t have an account? <Link to={Paths.REGISTER}>Register</Link>
            </Typography.Text>

            <Error message={error} />
          </Space>
        </Card>
      </Row>
    </>
  );
});
