import React, {useState}  from 'react'
import { BotaoGlobal, TextoBotao } from '../../components/Button/styles'
import { Space } from '../Login/styles'
import RegisterService from '../../services/Register'
import { ContainerGlobal, Input } from '../../components/Global/styles'

export default function Register({navigation}){

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [error, setError] = useState('')

  async function btnRegister(name, email, senha, confirmacao){
    let result = null
    if (senha !== confirmacao){
        setError('*As senhas não conferem')
        return
    } else {
        result = await RegisterService(name, email, senha, confirmacao)
      if (result.status === 200){
          console.log('Cadastro concluído com sucesso!')
          navigation.navigate('Login')
      } else {
          //Enviar para tela de erro
          console.log('Error')
      }
    }
}

  return (
    <ContainerGlobal>
      <Space/>
      <Input
        placeholder={"Digite seu nome"}
        nome={"profile"}
        onChangeText={setName}/>
      <Input
        placeholder={"Digite seu email"} nome={"email"} keyboardType="email-address" onChangeText={setEmail}/>
      <Input
        placeholder={"Digite sua senha"} onChangeText={setSenha}/>
      <Input
        placeholder={"Confirme sua senha"} onChangeText={setConfirmacao}/>
      <Space/>
      <BotaoGlobal onPress={() => {btnRegister(name, email, senha, confirmacao)}}>
          <TextoBotao>Criar conta</TextoBotao>
      </BotaoGlobal>
      <BotaoGlobal onPress={() => navigation.push("Login")}>
          <TextoBotao>Voltar</TextoBotao>
      </BotaoGlobal>
    </ContainerGlobal>
  )
}