import React, { useCallback, useEffect, useState } from 'react';

import { Button } from '../../../components';
import {
  Container,
  HeaderView,
  HeaderText,
  ButtonView,
  DateView,
  DateTextView,
} from './styles';

const Home: React.FC = () => {
  const [isPressedEverything, setisPressedEverything] = useState(true);
  const [isPressedToDo, setisPressedToDo] = useState(false);
  const [isPressedDone, setisPressedDone] = useState(false);
  const [dayOfTheWeek, setDayOfTheWeek] = useState<string>();
  const [day, setDay] = useState<string>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<number>();

  const handlePressedEverything = useCallback(() => {
    setisPressedEverything(true);
    setisPressedToDo(false);
    setisPressedDone(false);
  }, []);

  const handlePressedToDo = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(true);
    setisPressedDone(false);
  }, []);

  const handlePressedDone = useCallback(() => {
    setisPressedEverything(false);
    setisPressedToDo(false);
    setisPressedDone(true);
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

  return (
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
    </Container>
  );
};

export default Home;
