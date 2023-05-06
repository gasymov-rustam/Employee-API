import { Form, Input } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { memo } from 'react';

interface PasswordInputProps {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
}

export const PasswordInput = memo((props: PasswordInputProps) => {
  const { name, placeholder, dependencies } = props;

  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Required field',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }

            if (name === 'confirmPassword') {
              if (getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Passwords do not match'));
            } else {
              if (value.length < 6) {
                return Promise.reject(new Error('Password should be at least 6 characters long'));
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size='large' autoComplete='none' />
    </Form.Item>
  );
});
