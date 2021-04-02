import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { Button } from '../../../components';
import api from '../../../services/api';
import { formatDate } from '../../../utils';
import {
  Container,
  Description,
  DescriptionText,
  Id,
  IdText,
  CreationDate,
  CreationDateText,
  LastUpdated,
  LastUpdatedText,
  Status,
  StatusText,
  ContainerWrap,
} from './styles';

interface Params {
  _id: string;
}

interface Item {
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  FormattedCreatedAt: string;
  FormattedUpdatedAt: string;
}

const ItemDescription: React.FC = () => {
  const [item, setItem] = useState<Item>({} as Item);
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`task/${routeParams._id}`).then((response) => {
      const createdAtDate = formatDate(response.data.data.createdAt);

      const updatedAtDate = formatDate(response.data.data.updatedAt);

      setItem({
        ...response.data.data,
        FormattedCreatedAt: createdAtDate,
        FormattedUpdatedAt: updatedAtDate,
      });
    });
  }, []);

  return (
    <ContainerWrap>
      <Container>
        <Description>Descrição</Description>
        <DescriptionText>{item.description}</DescriptionText>
        <Id>Id</Id>
        <IdText>{item._id}</IdText>
        <CreationDate>Data de criação</CreationDate>
        <CreationDateText>{item.FormattedCreatedAt}</CreationDateText>
        <LastUpdated>Última atualização</LastUpdated>
        <LastUpdatedText>{item.FormattedUpdatedAt}</LastUpdatedText>
        <Status>Status</Status>
        <StatusText>{item.completed ? 'Feito' : 'A fazer'}</StatusText>
        <Button
          style={{
            marginTop: 0,
            alignSelf: 'center',
            display: 'flex',
            marginLeft: 60,
          }}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          Voltar para home
        </Button>
      </Container>
    </ContainerWrap>
  );
};

export default ItemDescription;
