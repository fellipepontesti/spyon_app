import React, {useContext} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../../pages/Home';
import SelectAvatar from '../../pages/FirstLogin/SelectAvatar';
import SelectName from '../../pages/FirstLogin/SelectName';
import { AuthContext } from '../../context/auth';
import ScreenConfirmation from '../../pages/ScreenConfirmation';
import EditProfile from '../../pages/EditProfile';
import ScreenConfig from '../../pages/ScreenConfig';
import GameRoom from '../../pages/GameRoom';
import FindRoom from '../../pages/FindRoom';

export default function AppRouter() {

  const AppStack = createNativeStackNavigator();
  const auth = useContext(AuthContext)
  let initial = ''
  const firstLogin = auth.userData.firstLogin
  if (firstLogin) {
    initial = "SelectAvatar"
  } else {
    initial = "Home"
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="SelectAvatar" component={SelectAvatar} />
        <AppStack.Screen name="SelectName" component={SelectName} />
        <AppStack.Screen name="ScreenConfirmation" component={ScreenConfirmation} />
        <AppStack.Screen name="EditProfile" component={EditProfile} />
        <AppStack.Screen name="ScreenConfig" component={ScreenConfig} />
        <AppStack.Screen name="GameRoom" component={GameRoom} />
        <AppStack.Screen name="FindRoom" component={FindRoom} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}