import * as google from 'expo-google-app-auth'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import api from '../api'
import { saveDataStorage } from '../Storage/saveData'
export default async function loginWithGoogle () {
  const config = {
    androidClientId: '993252675541-khic1siod8u0d6hh1rdcl92q9s7skifd.apps.googleusercontent.com',
    iosClientId: '993252675541-qd9stbcqf4v4s2pjb56t9ot09b8ho3bf.apps.googleusercontent.com',
    scopes: ['profile', 'email']
  }

  try {
    const login = await google.logInAsync(config)

    if (login.type === "success") {
      console.log(login.user.id)
      const data = {
        email: login.user.email,
        token_google: login.idToken
      }

      const res = await api.post('login-with-google', data)

      if (res.data.statusCode === 200) {
        auth.setUserData({
          logado: true,
          user: {
            id: res.data.data.userId,
            nome: res.data.data.userName,
            token: res.data.data.token,
            avatar: res.data.data.avatar
          }
        })

        await saveDataStorage('loginData', auth)
        return res
      }
    } 
  } catch (error) {
    return error
  }
}
