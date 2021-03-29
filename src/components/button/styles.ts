import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;
  height: 56px;
  padding: 19px 25px;
  border-radius: 32px;
  background-color: #1fcc79;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 32px;
`;

export const ButtonText = styled.Text`
  font-family: Inter_700Bold;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.112px;
`;

export const ButtonContainer = styled.View``;
