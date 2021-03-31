import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from '../../../components/index';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationsErrors';
import {
  Container,
  Title,
  Footer,
  GoBackToLogin,
  GoBackToLoginText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  age: number;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const ageInputRef = useRef<TextInput>(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E=mail obrigatório')
            .email('Digite um e-mail válido'),
          age: Yup.number().required('Idade obrigatório'),
          password: Yup.string().required('Senha obrigatória').min(7),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('user/register', data, {
          headers: { 'Content-Type': 'application/json' },
        });

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        console.log(data);
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer cadastro, cheque as credenciais',
        );
      }
    },
    [navigation],
  );

  const handleShowPassword = useCallback(() => {
    setSecureTextEntry((state) => !state);
  }, []);

  return (
    <>
      <Container>
        <Title>Cadastre sua conta.</Title>
        <Form ref={formRef} onSubmit={handleSignUp}>
          <Input
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
            name="name"
            placeholder="Nome"
          />
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              ageInputRef.current?.focus();
            }}
            name="email"
            placeholder="E-mail"
            ref={emailInputRef}
          />

          <Input
            autoCapitalize="none"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
            name="age"
            placeholder="Idade"
            ref={ageInputRef}
          />
          <Input
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
            name="password"
            secureTextEntry={secureTextEntry}
            handleShowPassword={handleShowPassword}
            isPassword
            placeholder="Senha"
            ref={passwordInputRef}
          />

          <Button onPress={() => formRef.current?.submitForm()}>SignUp</Button>
        </Form>
        <Footer>
          <GoBackToLogin
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <GoBackToLoginText>Voltar para login</GoBackToLoginText>
          </GoBackToLogin>
        </Footer>
      </Container>
    </>
  );
};

export default SignUp;
