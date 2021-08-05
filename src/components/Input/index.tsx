import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <>
      <Container
        style={containerStyle}
        hasError={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        data-testid="input-container"
      >
        {Icon && <Icon size={20} />}
        <input
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          {...rest}
        />
      </Container>
      {error && (
        <ErrorMessage>
          <FiAlertCircle color="#c53030" />
          {error}
        </ErrorMessage>
      )}
    </>
  );
};

export default Input;
