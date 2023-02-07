import React, {useContext, useEffect, useState} from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import { ContainerGame, ContainerGlobal } from "../../components/Container/styles";
import { BotaoMenuPrincipal } from "../../components/Buttons/styles";
import { Space3 } from "../../components/Spaces/styles";
import { TextWhite, TextWhiteBold } from "../../components/Texts/styles";
import { AuthContext } from "../../context/auth";
import { socket } from "../../services/socket";
import { DivButtons, GridUsersName, TextCenter } from "./styles";
import { FlatList } from "react-native";
import { render } from "react-dom";
import { blue } from "@mui/material/colors";
import { Avatar } from "react-native-paper";

const numColunas = 3

export default function GameRoom({navigation, route}) {
  const auth = useContext(AuthContext)
  const [users, setUsers] = useState([...route.params?.data.players])
  const gameData = route.params?.data
  const code = gameData.code

  const formatData = (data, numColunas) => {
    const numberOfFullRows = Math.floor(data.length / numColunas);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColunas);
    while (numberOfElementsLastRow !== numColunas && numberOfElementsLastRow !== 0) {
      console.log('=====> ', numberOfElementsLastRow)
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };

  console.log(gameData.players)
  setUsers([gameData.players])

  // socket.on('players update', data => {
  //   console.log('atualizando')
  //   if (code === data.code) {
  //     setUsers([...data.players])
  //   }
  // })

  // useEffect(() => {

  //   return () => {
  //     socket.off('players update')
  //   }
  // }, [])

  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <GridUsersName style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <GridUsersName
        style={styles.item}
      >
        <Avatar.Image size={70} source={{uri: item.avatar}} />
        <TextWhite>{item.nome}</TextWhite>
      </GridUsersName>
    );
  }

  return(
      <ContainerGame>
        <Space3/>

        <TextCenter>{gameData.code}</TextCenter>
        <Space3/>
        {/* <FlatList
          data={() => formatData(users, numColunas)}
          renderItem={renderItem}
          numColumns={numColunas}
        /> */}
        <BotaoMenuPrincipal onPress={() => {navigation.navigate('Home')}}></BotaoMenuPrincipal>
      </ContainerGame>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#000000',
  },
  item: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColunas, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  }
});