import React, {useState, useContext} from 'react'
import * as S from './styles'
import { Input } from '../../components/Inputs/style'
import {BotaoGlobal, BotaoSemFundo, TextoBotao} from '../../components/Buttons/styles'
import { ContainerGlobal } from '../../components/Container/styles'
import { AuthContext } from '../../context/auth'
import { Space2 } from '../../components/Spaces/styles'
import { Snackbar } from 'react-native-paper'
import { Avatar } from 'react-native-paper';
import { DivBotoes } from '../../components/Divs/styles'
import { TextWhite } from '../../components/Texts/styles'
import { validateEmail } from '../../helpers'

export default function Login({navigation}){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const auth = useContext(AuthContext)
  const desativarError = () => setModalVisible(false);

  async function btnLogin(email, senha){
    const valid = validateEmail(email)
    if (!valid) {
      setError('Email inválido!')
      setModalVisible(true)
      return
    }
    if (senha.length < 6){
      setError('Senha de no mínimo 6 caracteres!')
      setModalVisible(true)
      return
    }
    const result = await auth.login(email, senha)
    if (result.status === 200){
      auth.setUserData({
        logado: true,
        user: {
          id: result.data.data.userId,
          nome: result.data.data.userName,
          token: result.data.data.token,
          avatar: result.data.data.avatar
        }
      })
    } else {
      const err = result.error.message
      if (err === "Não existe usuário com esse email."){
        setError("Usuário não encontrado.")
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
      <TextWhite>Seja bem-vindo ao Spyon</TextWhite>
      <Space2/>
      <Avatar.Image size={150} source={require('../../../assets/206858.png')} />
      <Space2/>
      {modalVisible && 
        <Snackbar
        visible={modalVisible}
        onDismiss={desativarError}
        style={{textAlign: 'center', backgroundColor: "#cc0000", color: "#000"}}
        action={{
          label: 'X',
          color: "#fff",
          onPress: () => {
            setModalVisible(!modalVisible)
          },
        }}>
        <TextWhite>{error}</TextWhite>
        </Snackbar>
      }
      <S.DivLogin>
        <Input 
          nome={"email"} placeholder={"Digite seu email"} onChangeText={setEmail}
        />
        <Input 
          nome={"vpn-eye"} secureTextEntry={true} placeholder={"Digite sua senha"} onChangeText={setSenha}
        />
      </S.DivLogin>
      <S.DivRight>
        <S.TextClick onPress={() => {navigation.push("Remember")}}>Esqueceu sua senha?</S.TextClick>
      </S.DivRight>
      <Space2/>
      <DivBotoes>
        <BotaoGlobal onPress={() => {btnLogin(email, senha)}}>
          <TextoBotao>ENTRAR</TextoBotao>
        </BotaoGlobal>
        <BotaoSemFundo onPress={() => {navigation.push("Register")}}>
          <TextoBotao>REGISTRAR</TextoBotao>
        </BotaoSemFundo>
      </DivBotoes>
    </ContainerGlobal>
  )
}