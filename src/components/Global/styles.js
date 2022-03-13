import styled from "styled-components"

export const ContainerGlobal = styled.View`
  flex: 1;
  position: relative;
  background-color: #000000;
  align-items: center;
  justify-content: center;
`

export const DivGlobal = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  display: flex;
`

export const Input = styled.TextInput`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  color: black;
  background-color: #ffffff;
  padding: 15px;
  margin: 10px;
  border-radius: 50px;
  width: 75%; 
  border: 3px solid #0A9918;
`