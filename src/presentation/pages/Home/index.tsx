import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '../../../components';
import api from '../../../services/api';
import {
  Container,
  HeaderView,
  HeaderText,
  ButtonView,
  DateView,
  DateTextView,
  ItemView,
  ItemText,
  ItemButton,
  ButtonText,
  IconFeather,
  FooterView,
  FooterViewText,
  FooterViewTextTask,
  ItemScrowView,
} from './styles';

interface Item {
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [isPressedEverything, setisPressedEverything] = useState(true);
  const [isPressedToDo, setisPressedToDo] = useState(false);
  const [isPressedDone, setisPressedDone] = useState(false);
  const [dayOfTheWeek, setDayOfTheWeek] = useState<string>();
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<number>();
  const [items, setItems] = useState<Item[]>([]);
  const [completed, setCompleted] = useState<Item[]>([]);

  const navigation = useNavigation();

  const handlePressedEverything = useCallback(() => {
    setisPressedEverything(true);
    setisPressedToDo(false);
    setisPressedDone(false);
    api.get('task').then((response) => {
      setItems(response.data.data);
    });
  }, []);

  const handlePressedToDo = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(true);
    setisPressedDone(false);

    api
      .get('task', {
        params: {
          completed: false,
        },
      })
      .then((response) => {
        setItems(response.data.data);
      });
  }, []);

  const handlePressedDone = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(false);
    setisPressedDone(true);

    api
      .get('task', {
        params: {
          completed: true,
        },
      })
      .then((response) => {
        setItems(response.data.data);
      });
  }, []);

  useEffect(() => {
    const dayOfTheWeekArray = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const monthOfTheYear = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    const data = new Date(),
      dayOfTheWeek = dayOfTheWeekArray[data.getDay()],
      day = data.getDate().toString().padStart(2, '0'),
      month = monthOfTheYear[data.getMonth()],
      year = data.getFullYear();
    setDayOfTheWeek(dayOfTheWeek);
    setDay(day);
    setMonth(month);
    setYear(year);
  }, []);

  useEffect(() => {
    api.get('task').then((response) => {
      setItems(response.data.data);
    });
  }, []);

  useEffect(() => {
    api
      .get('task', {
        params: {
          completed: true,
        },
      })
      .then((response) => {
        setCompleted(response.data.data);
      });
  }, []);

  const handleNavigationToDetails = async (_id: string): Promise<void> => {
    navigation.navigate('ItemDescription', { _id });
    console.log(_id);
  };

  return (
    <Container style={{ flex: 1 }}>
      <HeaderView>
        <HeaderText>Filtrar</HeaderText>
        <ButtonView>
          <Button
            onPress={handlePressedEverything}
            style={{
              height: 48,
              width: 102,
              backgroundColor: isPressedEverything ? '#1fcc79' : '#F4F5F7',
            }}
          >
            Todas
          </Button>
          <Button
            onPress={handlePressedToDo}
            style={{
              height: 48,
              width: 102,
              marginLeft: 10,
              backgroundColor: isPressedToDo ? '#1fcc79' : '#F4F5F7',
            }}
          >
            A fazer
          </Button>
          <Button
            onPress={handlePressedDone}
            style={{
              height: 48,
              width: 102,
              marginLeft: 10,
              backgroundColor: isPressedDone ? '#1fcc79' : '#F4F5F7',
            }}
          >
            Feitas
          </Button>
        </ButtonView>
      </HeaderView>
      <DateView>
        <DateTextView>
          {dayOfTheWeek}. {day} de {month} de {year}
        </DateTextView>
      </DateView>
      <ItemScrowView>
        {items.map((item) => (
          <ItemView key={item._id}>
            {item.completed ? (
              <IconFeather>
                <Feather name="check" size={18} color="#fff" />
              </IconFeather>
            ) : (
              <Feather name="circle" size={20} color="#9FA5C0" />
            )}
            <ButtonText onLongPress={() => handleNavigationToDetails(item._id)}>
              <ItemText>{item.description}</ItemText>
            </ButtonText>
            <ItemButton>
              <Feather name="more-vertical" size={20} color="#9FA5C0" />
            </ItemButton>
          </ItemView>
        ))}
      </ItemScrowView>

      <FooterView>
        <FooterViewText>Total de tarefas:</FooterViewText>
        <FooterViewTextTask>
          {completed.length}/{items.length}
        </FooterViewTextTask>
      </FooterView>
    </Container>
  );
};

export default Home;
