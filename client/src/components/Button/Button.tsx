import { Form, Button as AntButton, ButtonProps } from 'antd';
import { memo } from 'react';

interface IButton extends Omit<ButtonProps, 'onClick'> {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = memo((props: IButton) => {
  const { children, onClick, ...otherProps } = props;

  return (
    <Form.Item>
      <AntButton onClick={onClick} {...otherProps}>
        {children}
      </AntButton>
    </Form.Item>
  );
});
