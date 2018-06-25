'use strict'
import { AsyncStorage } from 'react-native';

async function Get() {
  try {
    let response = await fetch('https://cards-cardshop.herokuapp.com/Usuarios');
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return null;
  }
}

async function Datos(Key) {
  try {
    return await AsyncStorage.getItem(Key);
  } catch (error) { }
}

async function setDatos(Data, Key) {
  try {
    await AsyncStorage.setItem(Key, JSON.stringify(Data));
  } catch (err) { }
}

module.exports = { Get, Datos, setDatos }