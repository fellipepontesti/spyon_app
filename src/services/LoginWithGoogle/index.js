import * as google from 'expo-google-app-auth'
export default async function loginWithGoogle () {
  const config = {
    androidClientId: '993252675541-khic1siod8u0d6hh1rdcl92q9s7skifd.apps.googleusercontent.com',
    iosClientId: '993252675541-qd9stbcqf4v4s2pjb56t9ot09b8ho3bf.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  }

  const login = await google.logInAsync(config)

  if (login.type === "success") {
    console.log("Sucesso")
  } else { 
    console.log("Login com Google falhou")
  }
}
