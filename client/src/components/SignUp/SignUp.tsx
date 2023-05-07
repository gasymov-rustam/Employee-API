import { Button, Card, Form, Row, Space, Typography, notification } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Input';
import { Error } from '../Error';
import { Paths, isErrorWithMessage } from '../../shared';
import { PasswordInput } from '../PasswordInput';
import { getCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import { useRegisterMutation } from '../../app/services/auth';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUp = memo(() => {
  const [form] = Form.useForm<SignUpForm>();
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector(getCurrentUser);
  const [error, setError] = useState('');
  const [registerUser, registerResult] = useRegisterMutation();
  const [api, contextHolder] = notification.useNotification();

  const handleChangeForm = async () => {
    // const isFormValid = form.getFieldsError().some(({ errors }) => errors.length);
    setState(form.isFieldsTouched());
  };

  const register = async (data: any) => {
    try {
      await registerUser(data).unwrap();

      api.success({
        message: 'Register',
        description: `Register: ${registerResult.data?.message}`,
        placement: 'bottomRight',
      });

      navigate('/');
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
        api.error({
          message: 'Register',
          description: err.data.message,
          placement: 'topRight',
        });
      } else {
        api.error({
          message: 'Register',
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
  }, [navigate, user]);

  return (
    <Row align='middle' justify='center'>
      {contextHolder}
      <Card title='Register' style={{ width: '30rem' }}>
        <Form form={form} onFinish={register} onValuesChange={handleChangeForm}>
          <Input type='text' name='name' placeholder='Name' />
          <Input type='email' name='email' placeholder='Email' />
          <PasswordInput name='password' placeholder='Password' />
          <PasswordInput name='confirmPassword' placeholder='Password' />
          <Button type='primary' htmlType='submit' disabled={!state}>
            Register
          </Button>
        </Form>

        <Space direction='vertical' size='large' style={{ marginTop: 20 }}>
          <Typography.Text>
            Register yet? <Link to={Paths.LOGIN}>Enter</Link>
          </Typography.Text>

          <Error message={error} />
        </Space>
      </Card>
    </Row>
  );
});
