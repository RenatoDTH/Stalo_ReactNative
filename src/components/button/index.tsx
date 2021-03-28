import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText, ButtonContainer } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <ButtonContainer>
      <Container {...rest}>
        <ButtonText>{loading ? 'Carregando...' : children}</ButtonText>
      </Container>
    </ButtonContainer>
  );
};

export default Button;
