import React, {useContext, createContext, useState, useEffect} from "react";
import api from "../services/api";

const AuthContext = createContext()

export const INITIAL_STATE = {
  logado: true,
  user: {
    email: '',
    nome: '',
    id: false,
    token: ''
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