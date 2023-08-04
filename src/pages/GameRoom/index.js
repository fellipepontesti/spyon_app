import React, {useContext, useEffect, useState} from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ContainerGame, ContainerGlobal } from "../../components/Container/styles";
import { BotaoMenuPrincipal } from "../../components/Buttons/styles";
import { Space3 } from "../../components/Spaces/styles";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import { AuthContext } from "../../context/auth";
import { DivButtons, GridContainer, GridUsersName, TextCenter } from "./styles";
import { FlatList } from "react-native";
import { render } from "react-dom";
import { blue } from "@mui/material/colors";
import { Avatar } from "react-native-paper";
import UpdateRoomGameService from "../../services/game/UpdateGameRoom/UpdateGameRoom";

const numColumns = 3

export default function GameRoom({navigation, route}) {
  // const socket = io('http://192.168.0.2:4000/')
  const auth = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [gameData, setGameData] = useState('')
  const code = route.params?.data.data.game.code || ''

  async function updateGame() {
    const response = await UpdateRoomGameService(code)

    if (response.status === 200) {
      setGameData(response.data.data)
      setUsers(response.data.data.players)
    }
  }
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateGame()
    }, 5500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderItem = (user, index) => {
    return (
      <GridUsersName key={index}>
        <Avatar.Image size={70} source={{uri: user.imageUrl}} />
        <TextWhite>{user.nome}</TextWhite>
      </GridUsersName>
    );
  }

  return(
      <ContainerGame>
        <Space3/>
        <TextCenter>{gameData.code}</TextCenter>
        <Space3/>
        <GridContainer>
          {users.map((user, i) => renderItem(user, i))}
        </GridContainer>
        <BotaoMenuPrincipal onPress={() => {navigation.navigate('Home')}}></BotaoMenuPrincipal>
      </ContainerGame>
  )
}