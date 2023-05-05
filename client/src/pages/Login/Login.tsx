import { memo } from 'react';
import { Layout } from '../../components';

interface LoginProps {}

export const Login = memo((props: LoginProps) => {
  return (
    <Layout>
      <div>Login</div>
    </Layout>
  );
});
