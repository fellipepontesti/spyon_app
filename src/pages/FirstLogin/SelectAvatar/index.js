import React, { useState } from 'react'
import { Avatar } from 'react-native-paper';
import { Space2, Space3 } from '../../../components/Spaces/styles'
import { Div, DivAvatar } from '../../../components/Divs/styles'
import { ContainerGlobal } from '../../../components/Container/styles'
import { TextBtnSlideAvatar, TextWhite } from '../../../components/Texts/styles'
import { BotaoGlobal, styleBtnSlideAvatar, TextoBotao } from '../../../components/Buttons/styles'
import AppIntroSlider from 'react-native-app-intro-slider'
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function SelectAvatar({navigation, route}){
  const update = route.params?.update

  console.log(update)
  function selected(url){
    if(update){
      navigation.push('EditProfile', {avatarSrc: url})
    } else {
      navigation.navigate('SelectName', { avatarSrc: url})
    }
  }

  const slides = [
    {
      id: '1',
      src: 'https://cdn-icons-png.flaticon.com/512/206/206858.png'
    },
    {
      id: '2',
      src: 'https://cdn-icons-png.flaticon.com/512/190/190636.png'
    }
  ]

  function renderSlide({ item }){
    return (
      <ContainerGlobal>
      <Div>
        <TextWhite>Selecione seu avatar</TextWhite>
        <Space2/>
      <DivAvatar>
        <Space3/>
        <Avatar.Image size={200} source={{uri: item.src}} />
        <Space3/>
      </DivAvatar>
      <Space3/>
      </Div>
      <BotaoGlobal onPress={() => selected(item.src)}>
        <TextoBotao>Escolher</TextoBotao>
      </BotaoGlobal>
    </ContainerGlobal>
    )
  }

  return (
        <AppIntroSlider
          renderItem={renderSlide}
          data={slides}
          activeDotStyle={{
            backgroundColor: "#0A9918",
            width: 30
          }}
          dotStyle={{
            backgroundColor: "rgba(255, 255, 255, .2)"
          }}
          showPrevButton={true}
          renderPrevButton={() =>
            <View style={styleBtnSlideAvatar}>
              <Text 
                style={TextBtnSlideAvatar}>
                  <Icon name="navigate-before" size={30} color="#fff"></Icon>
              </Text>
            </View>
          }
          showDoneButton={false}
          renderNextButton={() => 
            <View style={styleBtnSlideAvatar}>
              <Text style={TextBtnSlideAvatar}>
                <Icon name="navigate-next" size={30} color="#fff"></Icon>
              </Text>
            </View>
          }
        />
        
  )
}