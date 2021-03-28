import Icon from '@expo/vector-icons';
import { FormHandles } from '@unform/core';
import React, { useRef } from 'react';
import { TextInput } from 'react-native';

import { Input } from '../../../components/index';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <Container>
      <Title>Bem-vindo(a)!</Title>
      <Input
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordInputRef.current?.focus();
        }}
        name="email"
        placeholder="E-mail"
      />
      <Input
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={() => formRef.current?.submitForm()}
        name="password"
        icon="eye"
        placeholder="Senha"
      />
    </Container>
  );
};

export default SignIn;
