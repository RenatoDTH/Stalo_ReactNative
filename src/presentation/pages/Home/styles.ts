import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: white;
  padding-top: 24px;
  margin: 0;
`;

export const HeaderView = styled.View`
  justify-content: center;
  align-content: center;
  text-align: center;
  border-style: solid;
  border-bottom-color: #f4f5f7;
  border-bottom-width: 4px;
  height: 150px;
`;
export const HeaderText = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #2e3e5c;
  margin-left: 20px;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  margin-left: 18px;
  margin-right: 18px;
  margin-top: -5px;
`;
