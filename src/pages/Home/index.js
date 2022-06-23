import React, {useContext, useState} from 'react'
import { BotaoGlobal, BotaoMenuPrincipal, BotaoRedondoMenu, TextoBotao } from '../../components/Buttons/styles'
import { AuthContext, INITIAL_STATE } from '../../context/auth'
import { ActivityIndicator, Avatar, Snackbar } from 'react-native-paper';
import { Space2, Space3, Space5, Space6 } from '../../components/Spaces/styles'
import { ContainerGlobal } from '../../components/Container/styles'
import { TextWhite, TextWhiteBold } from '../../components/Texts/styles'
import { GetWalletService } from '../../services/Wallet';
import { DadosMoney, Div, TextPoints } from './styles';
import { Divisor } from '../../components/Divisor';
import { Image } from 'react-native';
import { nameRoom } from '../../shared/helpers/generateNameRoom';
import CreateRoomGameService from '../../services/CreateNewRoom';
import { socket } from '../../services/socket';

export default function Home({navigation}){
  const [money, setMoney] = useState(null)
  const [points, setPoints] = useState(null)
  const [error, setError] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingRoom, setLoadingRoom] = useState(false)
  const auth = useContext(AuthContext)
  const desativarError = () => setModalVisible(false);
  // getWalletPoints(auth.userData.user.id)
  
  // async function getWalletPoints(userId) {
  //   const result = await GetWalletService(userId)

  //   if (result.statusCode == 200) {
  //     setMoney(result.data.wallet.money)
  //     setPoints(result.data.wallet.points)
  //     return false
  //   } else {
  //     setError("Não conseguimos obter seu saldo!")
  //     setModalVisible(true)
  //   }
  // }

  async function createRoomGame() {
    socket.emit('create room', {userData: auth.userData.user})
    socket.on('new user', data => {
      console.log(data)
    })
    // let codeRoom = nameRoom()
    // const result = await CreateRoomGameService(codeRoom)
    // if(result.data.statusCode === 200){
    //   setLoadingRoom(!loadingRoom)
    //   socket.send(codeRoom, auth.userData.user)
    //   navigation.push('GameRoom', {codeRoom})
    // } else {
    //   setLoadingRoom(!loadingRoom)
    //   createRoomGame()
    // }
  }

  return (
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
      <Space5/>
      <Divisor/>
      {/* <Space6/> */}
      <BotaoMenuPrincipal onPress={() => {
        setLoadingRoom(!loadingRoom)
        createRoomGame()
      }}>
        {loadingRoom
          ? <ActivityIndicator animating={true} color="#FFFFFF" />
          : <TextWhiteBold>Novo jogo</TextWhiteBold>
        }
      </BotaoMenuPrincipal>
      <BotaoMenuPrincipal onPress={() => {
        navigation.navigate('FindRoom')
      }}>
        <TextWhiteBold>Buscar jogo</TextWhiteBold>
      </BotaoMenuPrincipal>
      {/* <Space6/> */}
      <Divisor/>
      <Space5/>
      <Div>
        <BotaoRedondoMenu onPress={() => navigation.navigate("EditProfile")}>
          <Image 
            style={{backgroundColor:"#000", width: 30, height: 30, alignItems: "center"}}
            source={require('../../../assets/png/user.png')} 
          />
        </BotaoRedondoMenu>
        <BotaoRedondoMenu>
          <Image 
            style={{backgroundColor:"#000", width: 30, height: 30, alignItems: "center"}}
            source={require('../../../assets/png/shop.png')} 
          />
        </BotaoRedondoMenu>
        <BotaoRedondoMenu onPress={() => navigation.navigate("ScreenConfig")}>
          <Image 
            style={{backgroundColor:"#000", width: 30, height: 30, alignItems: "center"}}
            source={require('../../../assets/png/config.png')} 
          />
        </BotaoRedondoMenu>
        <BotaoRedondoMenu>
          <Image  
            style={{backgroundColor:"#000", width: 30, height: 30, alignItems: "center"}}
            source={require('../../../assets/png/help.png')} 
          />
        </BotaoRedondoMenu>
      </Div>
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