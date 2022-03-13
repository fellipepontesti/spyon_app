import api from "../api";

async function RegisterService( name, email, senha, confirmacao ){
  try{
    return await api.post('register', {
        name,
        email,
        password: senha,
        passwordConfirmation: confirmacao
    })
  } catch (error) {
    return error
  }

}

export default RegisterService