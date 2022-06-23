import React, {useContext, useState} from 'react'
import { AuthContext } from '../../../context/auth'
import { Space2, Space3 } from '../../../components/Spaces/styles'
import { Div } from '../../../components/Divs/styles'
import { ContainerGlobal } from '../../../components/Container/styles'
import { TextWhite } from '../../../components/Texts/styles'
import { BotaoGlobal, TextoBotao } from '../../../components/Buttons/styles'
import { Input } from '../../../components/Inputs/style';
import UpdateUserService from '../../../services/UpdateUser/index'
import { Snackbar, ActivityIndicator, Avatar } from 'react-native-paper'
import { Modal } from 'react-native'

export default function SelectName({navigation, route}){
  const auth = useContext(AuthContext)
  const avatar = route.params?.avatarSrc

  const [nome, setNome] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const desativarError = () => setModalVisible(false);

  function mountData(nome, avatarSrc){
    setLoading(!loading)
    return {
      id: auth.userData.user.id,
      name: nome,
      firstLogin: true,
      avatarSrc
    }
  }

  async function updateUser(nome, avatar){
    if (nome == '') {
      setError("Nome não pode ficar em branco")
      setModalVisible(!modalVisible)
      return
    }
    const data = mountData(nome, avatar)
    const result = await UpdateUserService(data)
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
      setLoading(!loading)
      navigation.navigate("ScreenConfirmation", {message: "Seu cadastro foi concluído!", goTo: "Home"})
    } else {
      setLoading(false)
      setError("Ocorreu um erro! Tente novamente =)")
      setModalVisible(!modalVisible)
      return
    }
  }

  return (
    <ContainerGlobal>
      <Div>
        <TextWhite>Defina seu nome</TextWhite>
        <Space2/>
          <Input onChangeText={setNome}/>
        <Space3/>
      </Div>
      <BotaoGlobal onPress={() => {updateUser(nome, avatar)}}>
        <TextoBotao>Confirmar</TextoBotao>
      </BotaoGlobal>
      <Space3/>
      {loading &&
        <ActivityIndicator animating={true} color="#0A9918" />
      }
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
    </ContainerGlobal>
  )
}