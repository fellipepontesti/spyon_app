import api from "../api";

async function LoginService( email, senha ){
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

export default LoginService