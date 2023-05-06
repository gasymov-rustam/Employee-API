import { Card, Form, Row, Space, Typography } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Button } from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths, isErrorWithMessage } from '../../shared';
import { PasswordInput } from '../PasswordInput';
import { Input } from '../Input';
import { Error } from '../Error';
import { UserData, useLoginMutation } from '../../app/services/auth';
import { useAppSelector } from '../../app/hooks';
import { getCurrentUser } from '../../features/auth/authSlice';

export const SignIn = memo(() => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const user = useAppSelector(getCurrentUser);
  const [loginUser, loginUserResult] = useLoginMutation();

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();

      if (loginUserResult.isSuccess) {
        setError('');
      }
      // navigate('/');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      // navigate("/");
    }
  }, [user, navigate]);

  return (
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
  );
});
