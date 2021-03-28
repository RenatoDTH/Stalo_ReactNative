import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
  width: 100%;
  height: 56px;
  padding: 19px 25px;
  border-radius: 32px;
  outline: none;
  background-color: #1fcc79;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  margin-top: 54px;
`;

export const ButtonText = styled.Text`
  font-family: Inter_700Bold;
  color: #fff;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.007em;
`;

export const ButtonContainer = styled.View``;
