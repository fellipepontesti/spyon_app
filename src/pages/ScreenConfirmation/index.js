import React, {useState} from 'react'
import { Avatar } from 'react-native-paper'
import { BotaoGlobal, TextoBotao } from '../../components/Buttons/styles'
import { ContainerGlobal } from '../../components/Container/styles'
import { Space2, Space3 } from '../../components/Spaces/styles'
import { TextWhite } from '../../components/Texts/styles'
export default function ScreenConfirmation({navigation, route}){

  const [loading, setLoading] = useState(false)
  const [sucess, setSucess] = useState(false)
  const message = route.params?.message
  const goTo = route.params?.goTo
  
  return (
    <ContainerGlobal>
      <TextWhite>{message}</TextWhite>
      <Space2/>
      <Avatar.Image size={200} source={require('../../../assets/verify.png')} />
      <Space3/>
      <BotaoGlobal onPress={() => {
          setLoading(false)
          setSucess(false)
          navigation.navigate(goTo)
        }}>
          <TextoBotao>Continuar</TextoBotao>
      </BotaoGlobal>
    </ContainerGlobal>
  )
}