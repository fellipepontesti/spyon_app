import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import Remember from '../../pages/Remember';
import ScreenConfirmation from '../../pages/ScreenConfirmation';

export default function AuthRouter() {

  const AuthStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Remember" component={Remember} />
        <AuthStack.Screen name="ScreenConfirmation" component={ScreenConfirmation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}