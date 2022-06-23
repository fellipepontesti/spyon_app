import React, { useEffect, useState }  from 'react'
import { BotaoGlobal, BotaoSemFundo, TextoBotao } from '../../components/Buttons/styles'
import { Space2, Space3 } from '../../components/Spaces/styles'
import { ActivityIndicator, Avatar, Snackbar } from 'react-native-paper';
import { ContainerGlobal } from '../../components/Container/styles'
import { DivBotoes } from '../../components/Divs/styles'
import { Input } from '../../components/Inputs/style'
import { TextWhite } from '../../components/Texts/styles'
import { validateEmail } from '../../helpers';
import UpdateUserService from '../../services/UpdateUser';
import { Modal } from 'react-native';

export default function Remember({navigation}){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const desativarError = () => setModalVisible(false)

  function mountData(email, password, passwordConfirmation){
    return {
      email,
      password,
      passwordConfirmation
    }
  }

  async function btnRemember(email, senha, confirmacao){
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
    }

    console.log("*****", loading)
    const data = mountData(email, senha, confirmacao)
    result = await UpdateUserService(data)
    if (result.status === 200){
      setLoading(false)
      navigation.navigate("ScreenConfirmation", {message: "Atualizado!", goTo: "Login"})
    } else {
      setLoading(false)
      setError("Ocorreu um erro! Tente novamente =)")
      setModalVisible(!modalVisible)
      return
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
        placeholder={"Digite nova senha"} secureTextEntry={true} onChangeText={setSenha}/>
      <Input
        placeholder={"Confirme a nova senha"} secureTextEntry={true} onChangeText={setConfirmacao}/>
      <Space2/>
      <DivBotoes>
        <BotaoGlobal onPress={() => btnRemember(email, senha, confirmacao)}>
            <TextoBotao>Alterar conta</TextoBotao>
        </BotaoGlobal>
        <BotaoSemFundo onPress={() => navigation.navigate("Login")}>
            <TextoBotao>Voltar</TextoBotao>
        </BotaoSemFundo>
      </DivBotoes>  
      <Space3/>

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


      {loading &&
        <ActivityIndicator animating={true} color="#0A9918" />
      }
    </ContainerGlobal>
  )
}