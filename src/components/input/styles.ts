import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<Props>`
  width: 327px;
  height: 56px;
  padding: 19px 25px;
  border-radius: 32px;
  background: #ffffff;
  border: 1px solid #d0dbea;
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c21600;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #1fcc79;
    `}
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  flex: 1;
  color: #9fa5c0;
  font-size: 15px;
  font-family: Roboto_500Medium;
  line-height: 18px;
  letter-spacing: 0.112px;
`;

export const Icon = styled(Feather)``;
