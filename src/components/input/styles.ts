import { Feather } from '@expo/vector-icons';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<Props>`
  width: 100%;
  height: 56px;
  padding: 19px 25px;
  border-radius: 32px;
  border: 1px solid #d0dbea;
  outline: none;
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

export const TextInput = styled.TextInput`
  flex: 1;
  color: #9fa5c0;
  font-size: 15px;
  font-family: Roboto_500Medium;
  line-height: 18px;
  letter-spacing: 0.007em;
`;

export const Icon = styled(Feather)``;
