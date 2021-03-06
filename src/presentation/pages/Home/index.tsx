import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

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
  Dropdown,
  DropDownEdit,
  DropDownEditText,
  CloseDropDown,
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
  const [dropdownShow, setDropwDownShow] = useState(false);
  const [itemId, setItemId] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const handlePressedEverything = useCallback(() => {
    setisPressedEverything(true);
    setisPressedToDo(false);
    setisPressedDone(false);
    setIsLoading(true);

    api.get('task').then((response) => {
      setItems(response.data.data);
      setIsLoading(false);
    });
  }, []);

  const handlePressedToDo = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(true);
    setisPressedDone(false);
    setIsLoading(true);

    api
      .get('task', {
        params: {
          completed: false,
        },
      })
      .then((response) => {
        setItems(response.data.data);
        setIsLoading(false);
      });
  }, []);

  const handlePressedDone = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(false);
    setisPressedDone(true);
    setIsLoading(true);

    api
      .get('task', {
        params: {
          completed: true,
        },
      })
      .then((response) => {
        setItems(response.data.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const dayOfTheWeekArray = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    const monthOfTheYear = [
      'Janeiro',
      'Fevereiro',
      'Mar??o',
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
    setIsLoading(true);
    api.get('task').then((response) => {
      setItems(response.data.data);
      setIsLoading(false);
    });
  }, [setItems]);

  const handleNavigationToDetails = async (_id: string): Promise<void> => {
    navigation.navigate('ItemDescription', { _id });
  };

  const handleDropDownShow = (id: string) => {
    setItemId(id);
    setDropwDownShow(true);
  };

  const handleDropDownClose = () => {
    setDropwDownShow(false);
  };

  const deleteItem = async (): Promise<void> => {
    try {
      await api.delete(`task/${itemId}`);
      setDropwDownShow(false);
      const itemFiltered = items.filter((item) => item._id !== itemId);
      setItems(itemFiltered);
    } catch (err) {
      Alert.alert('Erro ao tentar deletar', 'Tente novamente mais tarde');
    }
  };

  const succededItem = async (): Promise<void> => {
    try {
      const response = await api.put(`task/${itemId}`, {
        completed: true,
      });
      setDropwDownShow(false);

      setItems((state) => {
        return state.map((itemState) => {
          if (itemState._id === itemId) {
            return { ...response.data.data };
          }
          return itemState;
        });
      });
    } catch (err) {
      Alert.alert('Erro ao tentar deletar', 'Tente novamente mais tarde');
    }
  };

  const navigateEditItem = async (): Promise<void> => {
    navigation.navigate('EditModal', { itemId });
  };

  return (
    <LinearGradient
      colors={['#fff', 'rgba(31, 204, 121, 0.4)']}
      start={{ x: 0, y: 0.95 }}
      style={{ flex: 1 }}
    >
      <Container>
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
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#1fcc79"
              style={{ marginTop: 30 }}
            />
          ) : (
            items.map((item) => (
              <ItemView key={item._id}>
                {item.completed ? (
                  <IconFeather>
                    <Feather name="check" size={18} color="#fff" />
                  </IconFeather>
                ) : (
                  <Feather name="circle" size={20} color="#9FA5C0" />
                )}
                <ButtonText
                  onLongPress={() => handleDropDownShow(item._id)}
                  onPress={() => handleNavigationToDetails(item._id)}
                >
                  <ItemText>{item.description}</ItemText>
                </ButtonText>
                <ItemButton onPress={() => handleDropDownShow(item._id)}>
                  <Feather name="more-vertical" size={20} color="#9FA5C0" />
                </ItemButton>
              </ItemView>
            ))
          )}
        </ItemScrowView>

        {dropdownShow && (
          <Dropdown
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
            }}
          >
            <CloseDropDown onPress={handleDropDownClose}>
              <Feather name="x-square" size={20} color="#FF6464" />
            </CloseDropDown>
            <DropDownEdit onPress={navigateEditItem}>
              <Feather
                name="edit"
                size={24}
                color="#9FA5C0"
                style={{ marginRight: 10 }}
              />
              <DropDownEditText style={{ color: '#9FA5C0' }}>
                Editar
              </DropDownEditText>
            </DropDownEdit>
            <DropDownEdit onPress={succededItem}>
              <IconFeather style={{ marginRight: 12 }}>
                <Feather name="check" size={24} color="#fff" />
              </IconFeather>
              <DropDownEditText style={{ color: '#1fcc79' }}>
                Concluir
              </DropDownEditText>
            </DropDownEdit>
            <DropDownEdit onPress={deleteItem}>
              <Feather
                name="trash-2"
                size={24}
                color="#FF6464"
                style={{ marginRight: 10 }}
              />
              <DropDownEditText style={{ color: '#FF6464' }}>
                Excluir
              </DropDownEditText>
            </DropDownEdit>
          </Dropdown>
        )}

        <FooterView>
          <FooterViewText>Total de tarefas:</FooterViewText>
          <FooterViewTextTask>
            {items.filter((item) => item.completed).length}/{items.length}
          </FooterViewTextTask>
        </FooterView>
      </Container>
    </LinearGradient>
  );
};

export default Home;
