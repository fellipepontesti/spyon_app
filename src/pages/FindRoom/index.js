import React, { useContext, useState } from "react";
import { BotaoGlobal } from "../../components/Buttons/styles";
import { ContainerGlobal } from "../../components/Container/styles";
import { Input } from "../../components/Inputs/style";
import { Space2 } from "../../components/Spaces/styles";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import { AuthContext } from "../../context/auth";
import { socket } from "../../services/socket";

export default function FindRoom({navigation}) {
  const auth = useContext(AuthContext)
  const [code, setCode] = useState('')
  
  socket.on('room found', data => {
    const user = data.user

    console.log('**************')
    if (user === socket.id) {
      // navigation.navigate('GameRoom', {data: data.result})
    }
  })

  async function findRoom(code){
    socket.emit('join room', {
      userData: auth.userData.user,
      code: code
    })

    // socket.on('room found', data => {
    //   navigation.navigate('GameRoom', {data})
    // })
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