import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveDataStorage(name, data) {
  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem(`@${name}`, jsonValue)
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}