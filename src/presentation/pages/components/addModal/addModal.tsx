import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { View, Alert, Text } from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from '../../../../components';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationsErrors';
import { HeaderText, ButtonContainer } from './styles';

interface AddDescriptionFormData {
  description: string;
}

const AddModal: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const handleCreateItem = useCallback(async (data: AddDescriptionFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Item obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('task', {
        description: data.description,
      });

      Alert.alert('Item criado com sucesso');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na criação do item',
        'Ocorreu um erro ao criar o item, verifique o campo',
      );
    }
  }, []);

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          height: '50%',
          width: '100%',
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HeaderText>Criar nova tarefa</HeaderText>
        <Form ref={formRef} onSubmit={handleCreateItem}>
          <Input
            name="description"
            placeholder="Descrição"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
          <ButtonContainer>
            <Button
              onPress={() => navigation.navigate('Home')}
              style={{
                backgroundColor: '#F4F5F7',
                marginRight: 10,
                width: 156,
              }}
            >
              <Text style={{ color: '#2E3E5C' }}>Cancelar</Text>
            </Button>
            <Button
              style={{ width: 156 }}
              onPress={() => formRef.current?.submitForm()}
            >
              Criar
            </Button>
          </ButtonContainer>
        </Form>
      </View>
    </View>
  );
};

export default AddModal;
