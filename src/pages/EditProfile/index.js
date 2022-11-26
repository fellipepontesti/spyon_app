import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Avatar, Snackbar } from "react-native-paper";
import { BotaoGlobal } from "../../components/Buttons/styles";
import { ContainerGlobal } from "../../components/Container/styles";
import { Input } from "../../components/Inputs/style";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import { AuthContext } from "../../context/auth";
import UpdateUserService from "../../services/UpdateUser";
import { GetWalletService } from "../../services/Wallet";
import { DadosMoney, Div, TextPoints } from "../Home/styles";
import { Space, Space2 } from "./styles";

export default function EditProfile({navigation, route}){
  const auth = useContext(AuthContext)
  const [money, setMoney] = useState(null)
  const [points, setPoints] = useState(null)
  const [error, setError] = useState(true)
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [name, setName] = useState(auth.userData.user.nome)
  const desativarError = () => setModalVisible(false);
  const update = route.params?.avatarSrc
  const avatar = auth.userData.user.avatar

  useEffect(() => {
    if (update){
      setUrl(update)
    } else {
      setUrl(avatar)
    }
  }, [url])

  getWalletPoints(auth.userData.user.id)

  async function updateUser(data) {
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
      setLoading(false)
      navigation.navigate("ScreenConfirmation", {message: "Seu cadastro foi atualizado!", goTo: "Home"})
    } else {
      setLoading(false)
      setError("Ocorreu um erro! Tente novamente =)")
      setModalVisible(!modalVisible)
      return
    }
  }

  function mountData() {
    setLoading(true)
    return {
      id: auth.userData.user.id,
      avatarSrc: update ? update : undefined,
      name: name ? name : undefined
    }
  }
  
  async function getWalletPoints(userId) {
    const result = await GetWalletService(userId)

    if (result.statusCode == 200) {
      setMoney(result.data.wallet.money)
      setPoints(result.data.wallet.points)
      return false
    } else {
      setError("Não conseguimos obter seu saldo!")
      setModalVisible(true)
    }
  }

  return(
    <ContainerGlobal>
      <Div>
        <DadosMoney>
          <Avatar.Image size={30} style={{backgroundColor:"#000"}} source={require('../../../assets/png/dtp.png')} />
          {points || points == 0
            ? <TextPoints>{points}</TextPoints>
            : <ActivityIndicator animating={true} color="#0A9918" />
          }
          <Avatar.Image size={30} style={{backgroundColor:"#000"}} source={require('../../../assets/png/dtp.png')} />
        </DadosMoney>
        <DadosMoney>
          <Avatar.Image size={30} style={{backgroundColor:"#000"}} source={require('../../../assets/png/money.png')} />
          {money || money == 0
            ? <TextPoints>{money}</TextPoints>
            : <ActivityIndicator animating={true} color="#0A9918" />
          }
          <Avatar.Image size={30} style={{backgroundColor:"#000"}} source={require('../../../assets/png/money.png')} />
        </DadosMoney>
      </Div>
      <Space/>
      <TextWhiteBold>Alterar nome</TextWhiteBold>
      <Input onChangeText={setName} value={name}></Input>
      <Space2/>
      <BotaoGlobal onPress={() => {
        navigation.navigate("SelectAvatar", {update: true})
      }}>
        <TextWhite>Mudar avatar</TextWhite>
      </BotaoGlobal>
        <Space2/>
        <Avatar.Image size={150} source={{uri: url}} />
      <Space2/>
      <Space/>
      {!loading
      ? <BotaoGlobal onPress={() => {
        if (name == '') {
          setError("Nome não pode ficar em branco")
          setModalVisible(!modalVisible)
          return
        } else {
          const data = mountData()
          if (data.name == undefined && data.avatarSrc == undefined){
            navigation.navigate("Home")
            setLoading(!loading)
          } else {
            setLoading(!loading)
            updateUser(data)}
          }
        }
      }>
        <TextWhiteBold>Confirmar</TextWhiteBold>
      </BotaoGlobal>
      : <ActivityIndicator animating={true} color="#0A9918" />
      }
      <Space/>
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