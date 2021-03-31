import { Feather } from '@expo/vector-icons';
import { useField } from '@unform/core';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInputProps, ViewStyle, StyleProp } from 'react-native';

import { Container, TextInput, TouchIcon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  handleShowPassword?(): void;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    name,
    isPassword,
    handleShowPassword,
    secureTextEntry,
    containerStyle = {},
    ...rest
  },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={secureTextEntry}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      {isPassword && (
        <TouchIcon onPress={handleShowPassword}>
          <Feather
            name={secureTextEntry ? 'eye' : 'eye-off'}
            size={15}
            color="#9FA5C0"
          />
        </TouchIcon>
      )}
    </Container>
  );
};

export default forwardRef(Input);
