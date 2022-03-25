import React, {useState, useContext} from 'react'
import * as S from './styles'
import { Chip } from 'react-native-paper'
import { Modal, Text, StyleSheet } from 'react-native'
import {ContainerGlobal, Input} from '../../components/Global/styles'
import {BotaoGlobal, TextoBotao} from '../../components/Button/styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoginService from '../../services/Login'
import { AuthContext } from '../../context/auth'
import { styleModal } from '../../components/Modals/styles'

export default function Login({navigation}){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const auth = useContext(AuthContext)

  async function btnLogin(email, senha){
    const result = await auth.login(email, senha)
    if (result.status === 200){
      console.log("chegou no if de sucesso", result.data.data)
      auth.setUserData({
        logado: true,
        user: {
          // email: result.data.userEmail,
          id: result.data.data.userId,
          nome: result.data.data.userName,
          token: result.data.data.token
        }
      })
    } else {
      const err = result.error.message
      if (err === "Não existe usuário com esse email."){
        setError("Email inválido")
        setModalVisible(!modalVisible)
      } else if (err === "Senha incorreta"){
        setError("Senha errada")
        setModalVisible(!modalVisible)
      } else {
        setError("Tente novamente")
        setModalVisible(!modalVisible)
      }
    }
  }

  return (
    <ContainerGlobal>
      <S.Space/>
      {modalVisible && 
        <Modal
          animationType='slide'
          visible={modalVisible}
        >
          <S.DivLogin>
            <S.DivError>
            <Text>{error}</Text>
            <BotaoGlobal onPress={() => {setModalVisible(false)}}>
              <TextoBotao onPress={() => {setModalVisible(false)}}>Fechar</TextoBotao>
            </BotaoGlobal>
            </S.DivError>
          </S.DivLogin>
        </Modal>
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
          <TextoBotao>REGISTRAR</TextoBotao>
        </BotaoGlobal>
      </S.Div>
    </ContainerGlobal>
  )
}