import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import { Button } from '../../../components';
import { useAuth } from '../../../hooks/auth';
import { Container, TextButton } from './styles';

const LogOut: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container style={{ flex: 1 }}>
      <Button style={{ width: 150 }} onPress={handleSignOut}>
        <TextButton>Sair</TextButton>
      </Button>
      <Button
        style={{ backgroundColor: 'red', width: 150 }}
        onPress={() => navigation.navigate('Home')}
      >
        <TextButton>Cancelar</TextButton>
      </Button>
    </Container>
  );
};

export default LogOut;
