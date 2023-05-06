import { Card, Form, Row, Space, Typography } from 'antd';
import { memo, useState } from 'react';
import { Button } from '../Button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../shared';
import { PasswordInput } from '../PasswordInput';
import { Input } from '../Input';
import { Error } from '../Error';

interface LoginProps {}

export const SignIn = memo((props: LoginProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // const user = useSelector(selectUser);
  // const [loginUser, loginUserResult] = useLoginMutation();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  const login = async (data: any /* UserData */) => {
    // try {
    //   await loginUser(data).unwrap();
    //   navigate("/");
    // } catch (err) {
    //   const maybeError = isErrorWithMessage(err);
    //   if (maybeError) {
    //     setError(err.data.message);
    //   } else {
    //     setError("Неизвестная ошибка");
    //   }
    // }
  };

  return (
    <Row align='middle' justify='center'>
      <Card title='Enter' style={{ width: '30rem' }}>
        <Form onFinish={login}>
          <Input type='email' name='email' placeholder='Email' />
          <PasswordInput name='password' placeholder='Password' />

          <Button
            type='primary'
            htmlType='submit'
            // loading={loginUserResult.isLoading}
          >
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
