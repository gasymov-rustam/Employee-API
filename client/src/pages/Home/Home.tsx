import { memo } from 'react';
import { Layout } from '../../components';

interface HomeProps {}

export const Home = memo((props: HomeProps) => {
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  );
});
