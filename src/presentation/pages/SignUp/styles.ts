import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 24px;
  margin: 0 auto;
`;

export const Title = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #2e3e5c;
  margin-bottom: 65px;
  margin-top: 125px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 80px;
  text-align: center;
  justify-content: center;
`;

export const GoBackToLogin = styled.TouchableOpacity`
  font-family: Roboto_700Bold;
  text-align: right;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.5px;
  color: #1fcc79;
`;
