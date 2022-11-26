import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadDataStorage(name) {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${name}`)
    if (jsonValue) {
      return JSON.parse(jsonValue)
    }

    return null;
  } catch(e) {
    return e
  }
}