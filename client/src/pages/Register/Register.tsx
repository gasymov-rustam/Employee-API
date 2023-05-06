import { memo } from 'react';
import { Layout, SignUp } from '../../components';

interface RegisterProps {}

export const Register = memo((props: RegisterProps) => {
  return (
    <Layout>
      <SignUp />
    </Layout>
  );
});
