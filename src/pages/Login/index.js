import React, {useState} from 'react'
import * as S from './styles'
import {ContainerGlobal, Input} from '../../components/Global/styles'
import {BotaoGlobal, TextoBotao} from '../../components/Button/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoginService from '../../services/Login'

export default function Login({navigation}){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  async function btnLogin(email, senha){
    const result = await LoginService(email, senha)
    if (result.status === 200){
      // logar usuario
      console.log('not Error')
    } else {
      const err = result.error.message
      if (err === "Não existe usuário com esse email."){
        setModalVisible(!modalVisible)
        setError("Email inválido")
      } else if (err === "Senha incorreta"){
        setModalVisible(!modalVisible)
        setError("Senha errada")
      } else {
        setModalVisible(!modalVisible)
        setError("Tente novamente")
      }

    }
  }

  return (
    <ContainerGlobal>
      <S.Space/>
      {modalVisible && 
        <S.DivError>
            <TextoBotao>*{error}</TextoBotao>
        </S.DivError>
      }
      <S.DivLogin>
        <Input 
          nome={"email"} placeholder={"Digite seu email"} onChangeText={setEmail}
        />
        <Input 
          nome={"vpn-eye"} placeholder={"Digite sua senha"} onChangeText={setSenha}
        />
      </S.DivLogin>
      <S.DivRight>
        <S.TextClick onPress={() => {navigation.push("Register")}}>Esqueceu sua senha?</S.TextClick>
      </S.DivRight>
      <S.Space/>
      <S.Div>
        <BotaoGlobal onPress={() => {btnLogin(email, senha)}}>
          <TextoBotao>ENTRAR</TextoBotao>
        </BotaoGlobal>
        <BotaoGlobal onPress={() => {navigation.push("Register")}}>
          <TextoBotao>REGISTER</TextoBotao>
        </BotaoGlobal>
      </S.Div>
    </ContainerGlobal>
  )
}