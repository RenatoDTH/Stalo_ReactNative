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

export const DateView = styled.View`
  justify-content: center;
  align-content: center;
  text-align: center;
  border-style: solid;
  border-bottom-color: #f4f5f7;
  border-bottom-width: 2px;
  height: 50px;
`;

export const DateTextView = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #2e3e5c;
  margin-left: 20px;
`;

export const ItemView = styled.View`
  align-content: center;
  text-align: center;
  align-items: center;
  border-style: solid;
  border-bottom-color: #f4f5f7;
  border-bottom-width: 2px;
  height: 50px;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

export const ButtonText = styled.TouchableOpacity`
  width: 250px;
`;

export const ItemText = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #2e3e5c;
  margin-left: 20px;
`;
export const ItemButton = styled.View`
  right: -10px;
  margin-left: 10px;
`;

export const IconFeather = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #1fcc79;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export const FooterView = styled.View`
  flex: 1;
  bottom: 0;
  height: 50px;
  flex-direction: row;
  margin-top: 10px;
`;
export const FooterViewText = styled.Text`
  font-family: Roboto_400Regular;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #2e3e5c;
  margin-left: 20px;
`;

export const FooterViewTextTask = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 17px;
  line-height: 27px;
  letter-spacing: 0.5px;
  color: #1fcc79;
  margin-left: 20px;
`;
