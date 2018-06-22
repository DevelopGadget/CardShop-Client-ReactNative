import React from 'react';
import Login from './Src/Views/Login';
import Registro from './Src/Views/Registro';
import { createStackNavigator } from 'react-navigation';
import { ImageBackground, NetInfo } from 'react-native';

export default class App extends React.Component {
  render() {
    return (<AppStackNavigation/>);
  }
}
export class Conexion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Frist: true }
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    if (this.state.Frist) {
      this.props.navigation.push('Login');
    }
  }
  handleConnectionChange = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected && this.state.Frist == false) {
        this.props.navigation.push('Login');
      }
      else if (!isConnected) {
        this.setState({ Frist: false });
        this.props.navigation.navigate('Conexion');
      }
    });
  }
  render() {
    return (
      <ImageBackground source={{ uri: 'https://image.ibb.co/d1WFc8/Conexion.png' }} resizeMode='cover' style={{ width: '100%', height: '100%', flex: 1 }} />
    );
  }
}

const AppStackNavigation = createStackNavigator({
  Conexion: { screen: Conexion, navigationOptions: () => ({header: null}) },
  Login: { screen: Login, navigationOptions: () => ({header: null}) },
  Registro: { screen: Registro, navigationOptions: () => ({header: null}) },
})
