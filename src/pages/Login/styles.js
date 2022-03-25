import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: #000000;
  align-items: center;
  justify-content: center;
`

export const TextClick = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #FFFFFF;
  margin-top: 10px;
`

export const DivRight = styled.View`
  margin-top: -10px;
  align-items: flex-end;
  width: 75%;
`

export const DivLogin = styled.View`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0px;
  width: 100%;
  display: flex;
`

export const DivError = styled.View`
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0px; */
  width: 100%;
  font-size: 12px;
`

export const Div = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 80%;
  display: flex;
`

export const Space = styled.View`
  margin-top: 100px;
`