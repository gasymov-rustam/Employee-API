import { Alert } from 'antd';
import { memo } from 'react';

interface ErrorProps {
  message?: string;
}

export const Error = memo(({ message }: ErrorProps) => {
  if (!message) {
    return null;
  }

  return <Alert message={message} type='error' />;
});
