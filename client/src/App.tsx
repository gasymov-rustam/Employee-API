import { ConfigProvider, theme } from 'antd';
import { BrowserRouter } from './providers';

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <BrowserRouter />
    </ConfigProvider>
  );
};
