import { memo } from 'react';
import { Layout, SignIn } from '../../components';

interface LoginProps {}

export const Login = memo((props: LoginProps) => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
});
