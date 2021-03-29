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
  margin-bottom: 30px;
  margin-top: 65px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 20px;
  text-align: center;
  justify-content: center;
`;

export const GoBackToLogin = styled.TouchableOpacity`
  text-align: right;
`;

export const GoBackToLoginText = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.5px;
  color: #1fcc79;
`;
