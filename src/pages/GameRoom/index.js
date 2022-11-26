import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import { Avatar } from "react-native-paper";
import io from "socket.io-client";
import { BotaoMenuPrincipal } from "../../components/Buttons/styles";
import { ContainerGlobal } from "../../components/Container/styles";
import { Space1, Space3 } from "../../components/Spaces/styles";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import { AuthContext } from "../../context/auth";
import FindRoomGameService from "../../services/FindRoom";
import { DivButtons, GridUsers, GridUsersImage, GridUsersName } from "./styles";


export default function GameRoom({navigation, route}) {
  const auth = useContext(AuthContext)
  const users = []
  users.push({name: 'Jão'})
  const codeRoom = route.params?.codeRoom
  const socket = io('http://192.168.0.5:4000/')

  function newUserInGame(user){
    users.push(user)
  }

  useEffect(() => {
    console.log(users)
  }, [users])

  return(
    <ContainerGlobal>
      <TextWhite>
        Bem vindo a nova sala!
      </TextWhite>
      <TextWhite>
        O código da sala é: {codeRoom}
      </TextWhite>
      <Space3/>
      <TextWhite>
        Usuários online:
      </TextWhite>
      <Space3/>
      <GridUsersName>
        {users.map(user => {
          return(
              <TextWhite key={user.name}>
                {user.name}
              </TextWhite>
          )
        })}
      </GridUsersName>
      <DivButtons>
        <BotaoMenuPrincipal onPress={() => navigation.push("Home")}>
          <TextWhiteBold>Voltar</TextWhiteBold>
        </BotaoMenuPrincipal>
        <BotaoMenuPrincipal>
          <TextWhiteBold>Conectar</TextWhiteBold>
        </BotaoMenuPrincipal>
      </DivButtons>
    </ContainerGlobal>
  )

}