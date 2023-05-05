import { memo } from 'react';
import { Layout as AntLayout } from 'antd';

import cls from './Layout.module.css';
import { Header } from '../Header';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className={cls.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>{children}</AntLayout.Content>
    </div>
  );
});
