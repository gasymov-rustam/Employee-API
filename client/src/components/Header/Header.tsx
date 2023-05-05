import { TeamOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { Button } from '../Button';

import cls from './Header.module.css';
import { Paths } from '../../shared/router/router';

export const Header = () => {
  const user = undefined;
  // const user = useSelector(selectUser);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const onLogoutClick = () => {
    // dispatch(logout());
    // localStorage.removeItem('token');
    // navigate('/login');
  };

  return (
    <Layout.Header className={cls.header}>
      <Space>
        <TeamOutlined className={cls.teamIcon} />

        <Link to={Paths.HOME}>
          <Button type='ghost'>
            <Typography.Title level={1}>Employees</Typography.Title>
          </Button>
        </Link>
      </Space>

      {user ? (
        <Button type='ghost' icon={<LogoutOutlined />} onClick={onLogoutClick}>
          Exit
        </Button>
      ) : (
        <Space>
          <Link to={Paths.REGISTER}>
            <Button type='ghost' icon={<UserOutlined />}>
              Register
            </Button>
          </Link>

          <Link to={Paths.LOGIN}>
            <Button type='ghost' icon={<LoginOutlined />}>
              Enter
            </Button>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
