import { Dimensions, StyleSheet } from "react-native";
import { PixelRatio } from "react-native-web";
import styled from "styled-components";

export const GridUsersImage = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
`

export const GridUsersName = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 33.33%;
  background-color: transparent;
  padding: 15px;
`

export const TextCenter = styled.Text`
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    color: #ffffff;
`

export const DivButtons = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
`

export const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;