import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { loadDataStorage } from "../Storage/loadData";

export async function loginActive(auth) {
  const result = await loadDataStorage('loginData')

  if (result && result.logado === true) {
    auth.setUserData({
      logado: result.logado,
      user: {
        id: result.user.id,
        nome: result.user.nome,
        token: result.user.token,
        avatar: result.user.avatar
      }
    })
  }
}