import React, {useContext} from 'react'
import { Text, Button } from 'react-native' 
import { BotaoGlobal, TextoBotao } from '../../components/Button/styles'
import {ContainerGlobal, Input} from '../../components/Global/styles'
import { AuthContext, INITIAL_STATE } from '../../context/auth'
import { Chip } from 'react-native-paper';

export default function Home({navigation}){

  const auth = useContext(AuthContext)

  return (
    <ContainerGlobal>
      <Chip
      type="outlined" color="#000"
      icon="information" onPress={() => console.log('Pressed')}
      >Texto de exemplo</Chip>
      <Text color="white">Pagina home</Text>
      <BotaoGlobal>
        <TextoBotao onPress={() => {
          auth.setUserData({
            ...INITIAL_STATE
          })
        }}>Deslogar</TextoBotao>
      </BotaoGlobal>
    </ContainerGlobal>
  )
}