import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import * as Yup from 'yup';

import { Input, Button } from '../../../../components';
import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationsErrors';
import { HeaderText, ButtonContainer, ContainerWrap } from './styles';

interface Params {
  itemId: string;
}

interface Item {
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}

const EditModal: React.FC = () => {
  const navigation = useNavigation();
  const [item, setItem] = useState<Item>({} as Item);
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    console.log(routeParams.itemId);
    api.get(`task/${routeParams.itemId}`).then((response) => {
      setItem(response.data.data);
    });
  }, []);

  const formRef = useRef<FormHandles>(null);

  const handleEditItem = useCallback(async (data: Item) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        description: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`task/${routeParams.itemId}`, data);

      Alert.alert('Item editado com sucesso');
      navigation.reset({
        routes: [{ name: 'Home' }],
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert(
        'Erro na edição do item',
        'Ocorreu um erro ao editar o item, tente mais tarde',
      );
    }
  }, []);

  return (
    <ContainerWrap>
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
          <HeaderText>Editar tarefa {item.description}</HeaderText>
          <Form ref={formRef} onSubmit={handleEditItem}>
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
                Salvar
              </Button>
            </ButtonContainer>
          </Form>
        </View>
      </View>
    </ContainerWrap>
  );
};

export default EditModal;
