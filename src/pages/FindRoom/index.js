import React, { useState } from "react";
import { BotaoGlobal } from "../../components/Buttons/styles";
import { ContainerGlobal } from "../../components/Container/styles";
import { Input } from "../../components/Inputs/style";
import { Space2 } from "../../components/Spaces/styles";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import FindRoomGameService from "../../services/FindRoom";
import { socket } from "../../services/socket";

export default function FindRoom({navigation}) {
  const [code, setCode] = useState('')

  async function findRoom(code){
    // await FindRoomGameService(code, {userName: 'zé'})
    socket.emit('join server', {
      name: 'novoUser',
      code: code
    }, res => {

    })
  }
  return(
    <ContainerGlobal>
      <TextWhiteBold>Buscar sala</TextWhiteBold>

      <Space2/>
      <Input placeholder={'Codigo aqui'} onChangeText={setCode}></Input>

      <Space2/>
      <BotaoGlobal onPress={() => {
        findRoom(code)
      }}>
        <TextWhite>Buscar</TextWhite>
      </BotaoGlobal>
      <BotaoGlobal onPress={() => {
        navigation.navigate('Home')
      }}>
        <TextWhite>voltar</TextWhite>
      </BotaoGlobal>
    </ContainerGlobal>
  )
}