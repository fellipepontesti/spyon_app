import React, {useState, useContext}  from 'react'
import { BotaoGlobal, BotaoSemFundo, TextoBotao } from '../../components/Buttons/styles'
import RegisterService from '../../services/Register'
import { Space2 } from '../../components/Spaces/styles'
import { ActivityIndicator, Avatar, Snackbar } from 'react-native-paper';
import { ContainerGlobal } from '../../components/Container/styles'
import { DivBotoes } from '../../components/Divs/styles'
import { Input } from '../../components/Inputs/style'
import { TextWhite } from '../../components/Texts/styles'
import { Modal } from 'react-native'
import { validateEmail } from '../../helpers';
import { AuthContext } from '../../context/auth';

export default function Register({navigation}){
  const auth = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')
  const desativarError = () => setModalVisible(false)
  const [modalVisible, setModalVisible] = useState(false)

  async function btnRegister(email, senha, confirmacao){
    const valid = validateEmail(email)
    let result = null
    if (!valid) {
      setError('Email inválido!')
      setModalVisible(true)
      return
    }
    if (senha.length < 6){
      setError('Senha de no mínimo 6 caracteres!')
      setModalVisible(true)
      return
    } else if (senha !== confirmacao){
      setError('As senhas não conferem')
      setModalVisible(true)
      return
    } else {
      setLoading(true)
      result = await RegisterService(email, senha, confirmacao)
      if (result.status === 200){
        const resultLogin = await auth.login(email, senha)
        if (resultLogin.status === 200){
          setLoading(false)
          auth.setUserData({
            firstLogin: true,
            logado: true,
            user: {
              id: resultLogin.data.data.userId,
              token: resultLogin.data.data.token
            }
          })
        }
      } else {
        setLoading(false)
        setConfirmacao('')
        setSenha('')
        setError("Ocorreu um erro! Tente novamente =)")
        setModalVisible(!modalVisible)
        return
      }
    }
}

  return (
    <ContainerGlobal>
      <Avatar.Image size={150} source={require('../../../assets/206858.png')} />
      <Space2/>
      <TextWhite>Preencha seus dados</TextWhite>
      <Space2/>
      <Input
        placeholder={"Digite seu email"} nome={"email"} keyboardType="email-address" onChangeText={setEmail}/>
      <Input
        placeholder={"Digite sua senha"} value={senha} secureTextEntry={true} onChangeText={setSenha}/>
      <Input
        placeholder={"Confirme sua senha"} value={confirmacao} secureTextEntry={true} onChangeText={setConfirmacao}/>
      <Space2/>
      <DivBotoes>
        <BotaoGlobal onPress={() => {btnRegister(email, senha, confirmacao)}}>
            <TextoBotao>Criar conta</TextoBotao>
        </BotaoGlobal>
        <Space2/>
        <BotaoSemFundo onPress={() => navigation.push("Login")}>
            <TextoBotao>Voltar</TextoBotao>
        </BotaoSemFundo>
      </DivBotoes>  
      {modalVisible && 
        <Snackbar
        visible={modalVisible}
        onDismiss={desativarError}
        style={{textAlign: 'center', backgroundColor: "#cc0000"}}
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
      <Space2/>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={loading}
        onRequestClose={() => {
          setLoading(false);
        }}
      >
        <ContainerGlobal>
          <ActivityIndicator animating={true} color="#0A9918" />
          <Space2/>
          <TextWhite>Carregando...</TextWhite>
        </ContainerGlobal>
      </Modal>

    </ContainerGlobal>
  )
}