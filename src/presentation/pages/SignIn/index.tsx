import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from '../../../components/index';
import getValidationErrors from '../../../utils/getValidationsErrors';
import {
  Container,
  Title,
  ForgotPassword,
  Footer,
  FooterText,
  CreateAccountButton,
  CreateAccountButtonText,
  ForgotPasswordText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E=mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Title>Bem-vindo(a)!</Title>
            <Form ref={formRef} onSubmit={handleSignIn}>
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
                placeholderTextColor="red"
              />
              <Input
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
                name="password"
                icon="eye"
                placeholder="Senha"
                placeholderTextColor="red"
              />
              <ForgotPassword onPress={() => {}}>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPassword>

              <Button onPress={() => formRef.current?.submitForm()}>
                Login
              </Button>
            </Form>
            <Footer>
              <FooterText>Não tem uma conta? </FooterText>
              <CreateAccountButton
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              >
                <CreateAccountButtonText>Cadastre-se</CreateAccountButtonText>
              </CreateAccountButton>
            </Footer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
