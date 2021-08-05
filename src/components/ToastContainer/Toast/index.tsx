import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  data: ToastMessage;
  style?: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ data, style }) => {
  const { description, type, title, id } = data;
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return (
    <Container
      hasdescription={Number(!!description)}
      type={type}
      style={style}
      data-testid="toast-message"
    >
      {icons[type || 'info']}

      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>

      <button data-testid="remove-toast-button" onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
