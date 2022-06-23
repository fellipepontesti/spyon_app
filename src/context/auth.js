import React, {useContext, createContext, useState, useEffect} from "react";
import api from "../services/api";

const AuthContext = createContext()

export const INITIAL_STATE = {
  logado: false,
  user: {
    nome: 'jão',
    id: 10,
    token: 'eae fi',
    avatar: 'um ai'
  }
}

function AuthProvider({children}) {
  const [userData, setUserData] = useState({...INITIAL_STATE})
  
  async function login(email, senha){
    try{
      const result = await api.post('login', {
          email,
          password: senha,
      })
  
      return result
    } catch (error) {
      return error.response.data
    }
  }
  
  return(
    <AuthContext.Provider value={{
      login,
      userData,
      setUserData
    }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export {AuthContext, AuthProvider}