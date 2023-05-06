import { ConfigProvider, theme } from 'antd';
import { BrowserRouter } from './providers';
import { Auth } from './components';

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Auth>
        <BrowserRouter />
      </Auth>
    </ConfigProvider>
  );
};
