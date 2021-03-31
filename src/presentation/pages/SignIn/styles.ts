import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 0.5px;
  text-align: center;
  color: #2e3e5c;
  margin-bottom: 65px;
  margin-top: 80px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 8px;
  margin-bottom: 8px;
  right: 0;
`;

export const ForgotPasswordText = styled.Text`
  font-family: Inter_500Medium;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.5px;
  text-align: right;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 60px;
  text-align: center;
  justify-content: center;
`;

export const FooterText = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.5px;
  color: #2e3e5c;
`;
export const CreateAccountButton = styled.TouchableOpacity`
  text-align: right;
`;

export const CreateAccountButtonText = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.5px;
  color: #1fcc79;
`;
