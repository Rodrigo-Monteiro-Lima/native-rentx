import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
  color?: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  /* background-color: ${({ theme }) => theme.colors.main}; */
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};

`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
