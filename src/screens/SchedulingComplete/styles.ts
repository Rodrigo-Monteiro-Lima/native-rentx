import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.colors.header};
  /* padding-top: 96px; */
`;

export const Content = styled.View`
  flex:1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  margin-top: 40px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text_detail};
  font-size: ${RFValue(15)}px;
  text-align: center;
  margin-top: 16px;
  line-height: ${RFValue(25)}px;
`;