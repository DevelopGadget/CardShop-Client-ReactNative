import React from 'react';
import { ImageBackground, StatusBar } from 'react-native';
import { Container, Content, Item, Icon, Input, Form, Button, Text, Spinner, View } from 'native-base';
import ModalBox from '../Views/ModalBox';

const _Client = require('../Firebase/Firebase');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Font: false, User: { Email: '', Password: '' }, ModalTexto: '', ModalView: false, ModalImage: false, ModalImageSet: ''};
  }
  componentDidMount() {
    StatusBar.setHidden(true);
    _Client.Auth.onAuthStateChanged((User) => {
      if (User) {
        if (User.emailVerified) {
          console.log(User.email);
          this.props.navigation.push('Principal')
        }
      }
    });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ Font: true });
  }

  Login = async () => {
    if (this.state.User.Email.length <= 0 || this.state.User.Password.length <= 0) {
      this.setState({ ModalTexto: 'Se requieren los campos', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalTexto: 'Espere validando ingreso...', ModalView: true, ModalImage: false });
      _Client.Auth.setPersistence(_Client.Firebase.auth.Auth.Persistence.LOCAL).then(() => {
        _Client.Auth.signInWithEmailAndPassword(this.state.User.Email, this.state.User.Password).then((User) => {
          if (User.user.emailVerified) {
            this.props.navigation.push('Principal')
          } else {
            this.setState({ ModalTexto: 'Se necesita estar verificado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
          }
        }).catch((error) => {
          this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
        })
      }).catch((error) => {
        this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
      })
    }
  }

  Restaurar = async () => {
    if (this.state.User.Email.length <= 0) {
      this.setState({ ModalTexto: 'Escriba el email en el campo', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
    } else {
      this.setState({ ModalTexto: 'Espere validando email', ModalView: true, ModalImage: false });
      await _Client.Auth.sendPasswordResetEmail(this.state.User.Email).then(() => {
        this.setState({ ModalTexto: 'Correo enviado', ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png' });
      }).catch((error) => {
        this.setState({ ModalTexto: error.message, ModalImage: true, ModalView: true, ModalImageSet: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678069-sign-error-512.png' });
      })
    }
  }

  render() {
    if (this.state.Font) {
      return (
        <ImageBackground source={{ uri: 'https://image.ibb.co/bWnJVT/Login.png' }} resizeMode='cover' style={{ width: '100%', height: '100%' }}>
          <Container>
            <Content padder contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}>
              <Form style={{ marginRight: 15, marginTop: 20 }}>
                <Item>
                  <Icon active type='Entypo' name='email' style={{ color: 'white' }} />
                  <Input style={{ color: 'white' }} placeholder="Correo" onChangeText={(Email) => this.setState({ User: { Email: Email, Password: this.state.User.Password }, ModalView: false })} />
                </Item>
                <Item>
                  <Icon active type='MaterialIcons' name='vpn-key' style={{ color: 'white', fontSize: 20, }} />
                  <Input style={{ color: 'white' }} secureTextEntry={true} placeholder="Contraseña" onChangeText={(Password) => this.setState({ User: { Email: this.state.User.Email, Password: Password }, ModalView: false })} />
                </Item>
              </Form>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <Button transparent onPress={this.Restaurar.bind(this)}>
                  <Text style={{ color: 'white' }}>¿Olvidaste Contraseña?</Text>
                </Button>
              </View>
              <Button block rounded style={{ backgroundColor: '#b33b3c' }} onPress={this.Login.bind(this)}>
                <Text>Login</Text>
              </Button>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                <Button transparent onPress={() => this.props.navigation.push('Registro')}>
                  <Text style={{ color: 'white' }}>¿No tienes cuenta?</Text>
                </Button>
              </View>
            </Content>
          </Container>
          {this.state.ModalView ? <ModalBox Text={this.state.ModalTexto} SpinnerComp={!this.state.ModalImage} Close={this.state.ModalImage} Image={this.state.ModalImage} ImageSet={this.state.ModalImageSet} /> : null}
        </ImageBackground>
      );
    } else {
      return (
        <Container>
          <Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <Spinner color='blue' size='large' />
          </Content>
        </Container>
      );
    }
  }
}