import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../pages/Login';
import Register from '../../pages/Register';

export default function AuthRouter() {

  const AuthStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}