import { Form, Input as AntInput, InputProps } from 'antd';
import { Rule } from 'antd/es/form';
import { memo } from 'react';

interface IInput extends InputProps {
  name: string;
  placeholder: string;
  type?: string;
}

export const Input = memo((props: IInput) => {
  const { type = 'text', name, placeholder, ...otherProps } = props;

  const rules = [
    { required: true, message: 'Required field' },
    name === 'name' && { min: 5, message: 'Name should be more than 5 letters' },
    name === 'email' && {
      type: 'email',
      message: 'The input is not valid E-mail!',
    },
  ].filter(Boolean) as Rule[];

  return (
    <Form.Item name={name} rules={rules} shouldUpdate>
      <AntInput placeholder={placeholder} type={type} size='large' autoComplete='none' {...otherProps} />
    </Form.Item>
  );
});
