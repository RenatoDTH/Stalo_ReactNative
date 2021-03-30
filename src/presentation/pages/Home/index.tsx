import React, { useCallback, useState } from 'react';

import { Button } from '../../../components';
import { Container, HeaderView, HeaderText, ButtonView } from './styles';

const Home: React.FC = () => {
  const [isPressedEverything, setisPressedEverything] = useState(true);
  const [isPressedToDo, setisPressedToDo] = useState(false);
  const [isPressedDone, setisPressedDone] = useState(false);

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
    </Container>
  );
};

export default Home;
