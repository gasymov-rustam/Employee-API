import { Button, Card, Form, Row, Space, Typography } from 'antd';
import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Input';
import { Error } from '../Error';
import { Paths } from '../../shared';
import { PasswordInput } from '../PasswordInput';

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
  // const user = useSelector(selectUser);
  const [error, setError] = useState('');
  // const [registerUser] = useRegisterMutation();

  const handleChangeForm = async () => {
    // const isFormValid = form.getFieldsError().some(({ errors }) => errors.length);
    setState(form.isFieldsTouched());
  };

  useEffect(() => {
    // if (user) {
    //   navigate("/");
    // }
  }, [navigate]);

  const register = async (data: any) => {
    // try {
    //   await registerUser(data).unwrap();
    //   navigate('/');
    // } catch (err) {
    //   const maybeError = isErrorWithMessage(err);
    //   if (maybeError) {
    //     setError(err.data.message);
    //   } else {
    //     setError('Неизвестная ошибка');
    //   }
    // }
  };

  return (
    <Row align='middle' justify='center'>
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
